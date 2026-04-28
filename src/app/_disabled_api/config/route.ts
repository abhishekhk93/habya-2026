import { NextResponse } from 'next/server';
import { mockConfig } from './mock';

export async function GET() {
  return NextResponse.json(mockConfig);
}
