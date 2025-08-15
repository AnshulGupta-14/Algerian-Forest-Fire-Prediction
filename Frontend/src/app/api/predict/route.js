import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { temperature, humidity, wind, rain } = body;
    
    // Validate input data
    if (!temperature || !humidity || !wind || !rain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Here you would typically call your ML model
    // For now, returning a mock response
    const prediction = {
      fireRisk: Math.random() > 0.5 ? 'High' : 'Low',
      confidence: Math.random() * 100,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Prediction API endpoint' });
}
