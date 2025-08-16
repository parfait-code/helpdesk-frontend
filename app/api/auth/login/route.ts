import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            // Augmenter le timeout à 10 secondes
            signal: AbortSignal.timeout(10000)
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    message: data.message || 'Erreur de connexion',
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
        console.error('Erreur lors de la connexion:', error);

        // Vérifier si c'est une erreur de timeout
        if (error instanceof Error && error.name === 'TimeoutError') {
            return NextResponse.json(
                {
                    message: 'Timeout: Les services backend ne répondent pas. Veuillez vérifier qu\'ils sont démarrés.',
                    success: false
                },
                { status: 504 }
            );
        }

        return NextResponse.json(
            {
                message: 'Erreur serveur lors de la connexion',
                success: false
            },
            { status: 500 }
        );
    }
}
