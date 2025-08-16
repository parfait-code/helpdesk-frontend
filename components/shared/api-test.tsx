"use client";

import { useState } from "react";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import { AuthService } from "@/lib/utils/auth-service";

export default function APITestComponent() {
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("TestPassword123!");
    const [result, setResult] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const testLogin = async () => {
        setIsLoading(true);
        setResult("🔄 Test de connexion en cours...");

        try {
            const response = await AuthService.login({ email, password });

            if (response.success) {
                setResult(
                    `✅ Connexion réussie!\nUtilisateur: ${JSON.stringify(
                        response.data?.user,
                        null,
                        2
                    )}`
                );
            } else {
                setResult(`❌ Échec de connexion:\n${response.error?.message}`);
            }
        } catch (error) {
            setResult(
                `❌ Erreur: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        } finally {
            setIsLoading(false);
        }
    };

    const testDirectAPI = async () => {
        setIsLoading(true);
        setResult("🔄 Test direct de l'API en cours...");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult(
                    `✅ API directe réussie!\nRéponse: ${JSON.stringify(
                        data,
                        null,
                        2
                    )}`
                );
            } else {
                setResult(
                    `❌ API directe échouée:\nStatut: ${
                        response.status
                    }\nRéponse: ${JSON.stringify(data, null, 2)}`
                );
            }
        } catch (error) {
            setResult(
                `❌ Erreur API directe: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold text-center">🧪 Test API</h2>

            <div className="space-y-3">
                <Input
                    label="Email"
                    value={email}
                    onValueChange={setEmail}
                    placeholder="test@example.com"
                />
                <Input
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onValueChange={setPassword}
                    placeholder="TestPassword123!"
                />
            </div>

            <div className="flex gap-2">
                <Button
                    color="primary"
                    onPress={testLogin}
                    isLoading={isLoading}
                    className="flex-1"
                >
                    Test AuthService
                </Button>
                <Button
                    color="secondary"
                    onPress={testDirectAPI}
                    isLoading={isLoading}
                    className="flex-1"
                >
                    Test API Directe
                </Button>
            </div>

            {result && (
                <Card>
                    <CardBody>
                        <pre className="text-sm whitespace-pre-wrap">
                            {result}
                        </pre>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}
