import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Simple validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        console.log('Contact Form Submission:', { name, email, message });

        // Verify environment variables are present
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('EMAIL_USER or EMAIL_PASS not set. Skipping email sending.');
            // We return success here so the UI still provides feedback in development
            return NextResponse.json(
                { message: 'Message logged (Email config missing)' },
                { status: 200 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `Portfolio Contact: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Message sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
