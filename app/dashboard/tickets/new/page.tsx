"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Chip,
  Divider,
  Progress,
  Avatar,
  Link,
  RadioGroup,
  Radio,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  ArrowLeft,
  Send,
  Paperclip,
  X,
  Upload,
  FileText,
  Image,
  File,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Search,
  Zap,
  Clock,
  Shield,
  Code,
  Cloud,
  Network,
  Headphones,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const categories = [
  {
    value: "helpdesk",
    label: "HelpDesk",
    description: "Support technique général",
    icon: Headphones,
    examples: [
      "Problème de connexion",
      "Réinitialisation mot de passe",
      "Accès refusé",
    ],
  },
  {
    value: "cloud",
    label: "Cloud",
    description: "Services cloud et AWS",
    icon: Cloud,
    examples: ["Migration AWS", "Configuration S3", "Problème EC2"],
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
    description: "Serveurs et systèmes",
    icon: Shield,
    examples: ["Panne serveur", "Espace disque", "Performance"],
  },
  {
    value: "network",
    label: "Réseau",
    description: "Connectivité et réseau",
    icon: Network,
    examples: ["VPN", "Problème connexion", "Configuration réseau"],
  },
  {
    value: "security",
    label: "Sécurité",
    description: "Sécurité et accès",
    icon: Shield,
    examples: ["Faille de sécurité", "Certificat SSL", "Authentification"],
  },
  {
    value: "development",
    label: "Développement",
    description: "Applications et code",
    icon: Code,
    examples: ["Bug application", "Nouvelle fonctionnalité", "API"],
  },
];

const priorities = [
  {
    value: "low",
    label: "Basse",
    description: "Peut attendre quelques jours",
    color: "success",
    icon: Clock,
    timeframe: "3-5 jours",
  },
  {
    value: "medium",
    label: "Moyenne",
    description: "À traiter rapidement",
    color: "warning",
    icon: Zap,
    timeframe: "24-48h",
  },
  {
    value: "high",
    label: "Haute",
    description: "Urgent, impact important",
    color: "danger",
    icon: AlertCircle,
    timeframe: "4-8h",
  },
  {
    value: "critical",
    label: "Critique",
    description: "Service arrêté, impact majeur",
    color: "danger",
    icon: AlertCircle,
    timeframe: "< 2h",
  },
];

const templates = [
  {
    id: 1,
    title: "Problème de connexion",
    category: "helpdesk",
    content: `Je ne parviens pas à me connecter à [SERVICE/APPLICATION].

Informations:
- Nom d'utilisateur: [VOTRE_NOM_UTILISATEUR]
- Message d'erreur: [MESSAGE_ERREUR]
- Dernière connexion réussie: [DATE]
- Navigateur utilisé: [NAVIGATEUR]`,
  },
  {
    id: 2,
    title: "Demande d'accès",
    category: "security",
    content: `Je souhaite obtenir l'accès à [RESSOURCE/APPLICATION].

Justification: [RAISON]
Durée d'accès souhaitée: [TEMPORAIRE/PERMANENT]
Niveau d'accès requis: [LECTURE/ECRITURE/ADMIN]`,
  },
  {
    id: 3,
    title: "Performance dégradée",
    category: "infrastructure",
    content: `J'observe des performances dégradées sur [SERVICE/APPLICATION].

Symptômes:
- Temps de réponse: [TEMPS]
- Fréquence du problème: [FREQUENCE]
- Nombre d'utilisateurs impactés: [NOMBRE]
- Actions déjà tentées: [ACTIONS]`,
  },
];

export default function NewTicketPage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    attachments: [] as File[],
    notifyEmail: true,
    notifySms: false,
  });

  const [errors, setErrors] = React.useState({
    title: "",
    description: "",
    category: "",
  });

  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateStep1 = () => {
    const newErrors = {
      title: "",
      description: "",
      category: "",
    };

    if (!formData.category) {
      newErrors.category = "Veuillez sélectionner une catégorie";
    }

    setErrors(newErrors);
    return !newErrors.category;
  };

  const validateStep2 = () => {
    const newErrors = { ...errors };

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis";
    } else if (formData.title.length < 10) {
      newErrors.title = "Le titre doit contenir au moins 10 caractères";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    } else if (formData.description.length < 50) {
      newErrors.description =
        "La description doit contenir au moins 50 caractères";
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/tickets");
      }, 2000);
    } catch (error) {
      console.error("Error submitting ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Le fichier ${file.name} est trop volumineux (max 10MB)`);
        return false;
      }
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newFiles],
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const useTemplate = (template: (typeof templates)[0]) => {
    setFormData((prev) => ({
      ...prev,
      title: template.title,
      description: template.content,
      category: template.category,
    }));
    onClose();
  };

  const relatedArticles = [
    { title: "Comment réinitialiser votre mot de passe", views: 1234 },
    { title: "Guide de dépannage réseau", views: 987 },
    { title: "Configuration VPN étape par étape", views: 654 },
  ];

  if (showSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Ticket créé avec succès !</h2>
          <p className="text-default-600 mb-2">Numéro de ticket: #1235</p>
          <p className="text-sm text-default-500">
            Redirection vers vos tickets...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button isIconOnly variant="light" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nouveau ticket</h1>
          <p className="text-default-600">
            Décrivez votre problème et nous vous aiderons
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? "bg-primary text-white"
                      : "bg-default-200 text-default-600"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-full h-1 mx-2 ${
                      step > s ? "bg-primary" : "bg-default-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span
              className={
                step >= 1 ? "text-primary font-medium" : "text-default-500"
              }
            >
              Catégorie
            </span>
            <span
              className={
                step >= 2 ? "text-primary font-medium" : "text-default-500"
              }
            >
              Description
            </span>
            <span
              className={
                step >= 3 ? "text-primary font-medium" : "text-default-500"
              }
            >
              Confirmation
            </span>
          </div>
        </CardBody>
      </Card>

      {/* Form Steps */}
      <Card>
        <CardBody className="p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Quelle est la nature de votre problème ?
                </h3>
                <p className="text-default-600 mb-6">
                  Sélectionnez la catégorie qui correspond le mieux à votre
                  demande
                </p>
              </div>

              <RadioGroup
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                isInvalid={!!errors.category}
                errorMessage={errors.category}
              >
                <div className="grid gap-4">
                  {categories.map((category) => (
                    <Radio
                      key={category.value}
                      value={category.value}
                      classNames={{
                        base: "max-w-none m-0",
                        wrapper: "hidden",
                      }}
                    >
                      <Card
                        className={`w-full cursor-pointer transition-all ${
                          formData.category === category.value
                            ? "border-primary bg-primary/5"
                            : "hover:bg-default-100"
                        }`}
                      >
                        <CardBody className="p-4">
                          <div className="flex gap-4">
                            <div
                              className={`p-3 rounded-lg ${
                                formData.category === category.value
                                  ? "bg-primary text-white"
                                  : "bg-default-100"
                              }`}
                            >
                              <category.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{category.label}</p>
                              <p className="text-sm text-default-600 mt-1">
                                {category.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {category.examples.map((example, idx) => (
                                  <Chip key={idx} size="sm" variant="flat">
                                    {example}
                                  </Chip>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Décrivez votre problème
                  </h3>
                  <p className="text-default-600">
                    Plus vous donnez de détails, plus nous pourrons vous aider
                    rapidement
                  </p>
                </div>
                <Button
                  variant="flat"
                  size="sm"
                  onClick={onOpen}
                  startContent={<FileText className="w-4 h-4" />}
                >
                  Utiliser un modèle
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Titre du ticket"
                  placeholder="Résumez votre problème en une phrase"
                  value={formData.title}
                  onValueChange={(value) => {
                    setFormData({ ...formData, title: value });
                    if (errors.title) setErrors({ ...errors, title: "" });
                  }}
                  isInvalid={!!errors.title}
                  errorMessage={errors.title}
                  description="Un titre clair aide à un traitement plus rapide"
                />

                <Textarea
                  label="Description détaillée"
                  placeholder="Décrivez votre problème en détail. Incluez toute information pertinente comme les messages d'erreur, les étapes pour reproduire le problème, etc."
                  value={formData.description}
                  onValueChange={(value) => {
                    setFormData({ ...formData, description: value });
                    if (errors.description)
                      setErrors({ ...errors, description: "" });
                  }}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                  minRows={6}
                  maxRows={12}
                  description={`${formData.description.length} caractères (minimum 50)`}
                />

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Priorité
                  </label>
                  <RadioGroup
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                    orientation="horizontal"
                  >
                    {priorities.map((priority) => (
                      <Radio
                        key={priority.value}
                        value={priority.value}
                        classNames={{
                          base: "max-w-none",
                          wrapper: "hidden",
                        }}
                      >
                        <Card
                          className={`cursor-pointer transition-all ${
                            formData.priority === priority.value
                              ? "border-2 border-primary"
                              : ""
                          }`}
                        >
                          <CardBody className="p-3">
                            <div className="flex items-center gap-2">
                              <priority.icon
                                className={`w-5 h-5 text-${priority.color}`}
                              />
                              <div>
                                <p
                                  className={`font-medium text-${priority.color}`}
                                >
                                  {priority.label}
                                </p>
                                <p className="text-xs text-default-500">
                                  {priority.timeframe}
                                </p>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>

                {/* File Upload */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Pièces jointes (optionnel)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive
                        ? "border-primary bg-primary/10"
                        : "border-default-300 hover:border-default-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-default-400" />
                    <p className="text-sm text-default-600 mb-2">
                      Glissez vos fichiers ici ou{" "}
                      <Button
                        variant="light"
                        size="sm"
                        className="text-primary"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        parcourir
                      </Button>
                    </p>
                    <p className="text-xs text-default-500">
                      Max 10MB par fichier • JPG, PNG, PDF, DOC, XLS
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && handleFiles(e.target.files)
                      }
                    />
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-default-100 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            {file.type.startsWith("image/") ? (
                              <Image className="w-4 h-4 text-primary" />
                            ) : (
                              <File className="w-4 h-4 text-primary" />
                            )}
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-default-500">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Related Articles */}
              <Card className="bg-default-50">
                <CardBody>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    Articles pouvant vous aider
                  </h4>
                  <div className="space-y-2">
                    {relatedArticles.map((article, index) => (
                      <Link
                        key={index}
                        href="#"
                        className="flex items-center justify-between p-2 hover:bg-default-100 rounded-lg transition-colors"
                      >
                        <span className="text-sm">{article.title}</span>
                        <Chip size="sm" variant="flat">
                          {article.views} vues
                        </Chip>
                      </Link>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Vérifiez votre ticket
                </h3>
                <p className="text-default-600">
                  Assurez-vous que toutes les informations sont correctes avant
                  l'envoi
                </p>
              </div>

              <Card className="bg-default-50">
                <CardBody className="space-y-4">
                  <div>
                    <p className="text-sm text-default-600">Catégorie</p>
                    <div className="flex items-center gap-2 mt-1">
                      {(() => {
                        const category = categories.find(
                          (c) => c.value === formData.category
                        );
                        const Icon = category?.icon || Headphones;
                        return (
                          <>
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="font-medium">
                              {category?.label}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm text-default-600">Titre</p>
                    <p className="font-medium mt-1">{formData.title}</p>
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm text-default-600">Description</p>
                    <p className="mt-1 whitespace-pre-wrap">
                      {formData.description}
                    </p>
                  </div>

                  <Divider />

                  <div>
                    <p className="text-sm text-default-600">Priorité</p>
                    <div className="mt-1">
                      {(() => {
                        const priority = priorities.find(
                          (p) => p.value === formData.priority
                        );
                        return (
                          <Chip color={priority?.color as any} variant="flat">
                            {priority?.label}
                          </Chip>
                        );
                      })()}
                    </div>
                  </div>

                  {formData.attachments.length > 0 && (
                    <>
                      <Divider />
                      <div>
                        <p className="text-sm text-default-600">
                          Pièces jointes
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.attachments.map((file, index) => (
                            <Chip key={index} size="sm" variant="flat">
                              {file.name}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>

              <div className="space-y-3">
                <h4 className="font-medium">Notifications</h4>
                <Checkbox
                  isSelected={formData.notifyEmail}
                  onValueChange={(checked) =>
                    setFormData({ ...formData, notifyEmail: checked })
                  }
                >
                  Recevoir les mises à jour par email
                </Checkbox>
                <Checkbox
                  isSelected={formData.notifySms}
                  onValueChange={(checked) =>
                    setFormData({ ...formData, notifySms: checked })
                  }
                >
                  Recevoir les notifications urgentes par SMS
                </Checkbox>
              </div>

              <Card className="bg-primary/10 border-primary/20">
                <CardBody>
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">
                        Que se passe-t-il ensuite ?
                      </p>
                      <ul className="space-y-1 text-default-600">
                        <li>• Un technicien sera assigné à votre ticket</li>
                        <li>• Vous recevrez une confirmation par email</li>
                        <li>
                          • Temps de réponse estimé :{" "}
                          {
                            priorities.find(
                              (p) => p.value === formData.priority
                            )?.timeframe
                          }
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </CardBody>

        <Divider />

        <CardBody>
          <div className="flex justify-between">
            <Button
              variant="light"
              onClick={step === 1 ? () => router.back() : handleBack}
              isDisabled={isSubmitting}
            >
              {step === 1 ? "Annuler" : "Retour"}
            </Button>

            {step < 3 ? (
              <Button
                color="primary"
                onClick={handleNext}
                endContent={<ArrowLeft className="w-4 h-4 rotate-180" />}
              >
                Continuer
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                endContent={!isSubmitting && <Send className="w-4 h-4" />}
              >
                {isSubmitting ? "Envoi..." : "Créer le ticket"}
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Template Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>Modèles de ticket</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Rechercher un modèle..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Search className="w-4 h-4 text-default-400" />}
              className="mb-4"
            />

            <div className="space-y-3">
              {templates
                .filter(
                  (template) =>
                    template.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    template.content
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((template) => (
                  <Card
                    key={template.id}
                    isPressable
                    onClick={() => useTemplate(template)}
                    className="hover:bg-default-100"
                  >
                    <CardBody>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{template.title}</p>
                          <p className="text-sm text-default-500 mt-1 line-clamp-2">
                            {template.content}
                          </p>
                        </div>
                        <Chip size="sm" variant="flat">
                          {
                            categories.find(
                              (c) => c.value === template.category
                            )?.label
                          }
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
