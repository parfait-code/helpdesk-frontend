import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: data.message || 'Erreur lors de l\'inscription',
                    success: false
                },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            data
        });

    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return NextResponse.json(
            {
                message: 'Erreur serveur lors de l\'inscription',
                success: false
            },
            { status: 500 }
        );
    }
}
