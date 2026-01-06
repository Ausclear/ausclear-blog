import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Store the message in your database
    // 2. Send an email notification to your team
    // 3. Send a confirmation email to the user

    // For now, we'll just log it
    console.log('New contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    })

    // You could store this in a Supabase table like this:
    // const { error } = await supabase
    //   .from('contact_submissions')
    //   .insert([
    //     {
    //       name,
    //       email,
    //       phone,
    //       subject,
    //       message,
    //     },
    //   ])
    //
    // if (error) {
    //   throw error
    // }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
