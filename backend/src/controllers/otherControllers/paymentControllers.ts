import { Request, Response } from "express";
import statusCode from "../../utils/statusCodes";
import Course, { ICourse } from "../../schema/courseSchema/courseSchema";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const paymentController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.headers;
    const cartData: Array<string> = req.body.cartData;

    if (cartData.length === 0) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Cart cannot be empty",
      });
    }
    let courses: ICourse[] | [] = [];

    for (const courseId of cartData) {
      let course;
      try {
        course = await Course.findById(courseId);

        if (!course) {
          return res.status(statusCode.NOT_FOUND).json({
            message: "Course not found",
          });
        }

        const alreadyEnrolled: boolean = course.studentsEnrolled.includes(
          userId as string
        );

        if (alreadyEnrolled) {
          return res.status(statusCode.UNAUTHORIZED).json({
            message: `student is already enrolled in ${course.courseName}`,
          });
        }

        courses = [...courses, course];
      } catch (error) {
        console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
          message: "Error on checking student details while creating payment",
        });
      }
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      courses.map((course) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: course.courseName,
          },
          unit_amount: course.coursePrice * 100,
        },
        quantity: 1,
      }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_LINK}/payment-success`,
      cancel_url: `${process.env.FRONTEND_LINK}/payment-cancel`,
    });

    return res.status(statusCode.CREATED).json({
      message: "Payment session created",
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

//configure webhook
export const paymentWebhook = async (req: Request, res: Response) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"]!;

  let event;

  const fulfillOrder = (
    lineItems: Stripe.ApiList<Stripe.LineItem> | undefined
  ) => {
    // TODO: fill me in
    console.log("Fulfilling order", lineItems);
  };

  const createOrder = (session: Stripe.Checkout.Session) => {
    // TODO: fill me in
    console.log("Creating order", session);
  };

  const emailCustomerAboutFailedPayment = (
    session: Stripe.Checkout.Session
  ) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
  };

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_SECRET_KEY!
    );
  } catch (err: any) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session: Stripe.Checkout.Session = event.data.object;
      // Save an order in your database, marked as 'awaiting payment'
      createOrder(session);

      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === "paid") {
        fulfillOrder(session.line_items);
      }
      break;
    }

    case "checkout.session.async_payment_succeeded": {
      const session: Stripe.Checkout.Session = event.data.object;

      // Fulfill the purchase...
      fulfillOrder(session.line_items);
      break;
    }

    case "checkout.session.async_payment_failed": {
      const session: Stripe.Checkout.Session = event.data.object;

      // Send an email to the customer asking them to retry their order
      emailCustomerAboutFailedPayment(session);
      break;
    }
  }

  res.status(statusCode.OK).end();
};

export default paymentController;
