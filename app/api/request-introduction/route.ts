import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company, clearanceType, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !clearanceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Store the request in your database
    // 2. Send an email notification to your team
    // 3. Send a confirmation email to the user

    // For now, we'll just log it (you can extend this to use Supabase to store the data)
    console.log('New introduction request:', {
      firstName,
      lastName,
      email,
      phone,
      company,
      clearanceType,
      message,
      submittedAt: new Date().toISOString(),
    })

    // You could store this in a Supabase table like this:
    // const { error } = await supabase
    //   .from('introduction_requests')
    //   .insert([
    //     {
    //       first_name: firstName,
    //       last_name: lastName,
    //       email,
    //       phone,
    //       company,
    //       clearance_type: clearanceType,
    //       message,
    //     },
    //   ])
    //
    // if (error) {
    //   throw error
    // }

    return NextResponse.json(
      { message: 'Request submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
