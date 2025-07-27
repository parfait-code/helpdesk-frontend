"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Avatar,
  Divider,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  User,
  Badge,
  Tabs,
  Tab,
  Link,
  Tooltip,
  Progress,
} from "@nextui-org/react";
import {
  ArrowLeft,
  Send,
  Paperclip,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Calendar,
  User as UserIcon,
  Star,
  Download,
  Printer,
  Share2,
  Archive,
  Trash2,
  Edit,
  FileText,
  Image,
  File,
  ExternalLink,
  ChevronRight,
  History,
  Shield,
  Zap,
  Activity,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";

// Mock data for the ticket
const ticketData = {
  id: "#1234",
  title: "Problème de connexion au serveur",
  description: `Bonjour,

Depuis ce matin, je ne parviens pas à me connecter au serveur principal. J'obtiens le message d'erreur suivant : "Connection timeout - Unable to reach server at 192.168.1.100".

J'ai essayé de :
- Redémarrer ma machine
- Vérifier ma connexion réseau
- Utiliser un autre navigateur

Le problème persiste. Cela impacte toute mon équipe qui ne peut pas accéder aux fichiers partagés.

Merci de votre aide rapide.`,
  status: "in-progress",
  priority: "high",
  category: "Infrastructure",
  createdBy: {
    name: "Jean Dupont",
    email: "jean.dupont@entreprise.com",
    avatar: "",
    department: "Service Commercial",
  },
  assignedTo: {
    name: "Marie Martin",
    email: "marie.martin@support.com",
    avatar: "",
    role: "Support Engineer",
  },
  createdAt: new Date("2024-03-15T09:00:00"),
  updatedAt: new Date("2024-03-15T14:30:00"),
  resolvedAt: null,
  sla: {
    responseTime: 2, // hours
    resolutionTime: 8, // hours
    responseDeadline: new Date("2024-03-15T11:00:00"),
    resolutionDeadline: new Date("2024-03-15T17:00:00"),
  },
  attachments: [
    {
      id: "1",
      name: "error_screenshot.png",
      size: 256000,
      type: "image/png",
      uploadedBy: "Jean Dupont",
      uploadedAt: new Date("2024-03-15T09:00:00"),
    },
    {
      id: "2",
      name: "network_config.txt",
      size: 4096,
      type: "text/plain",
      uploadedBy: "Jean Dupont",
      uploadedAt: new Date("2024-03-15T09:00:00"),
    },
  ],
  messages: [
    {
      id: "1",
      author: {
        name: "Jean Dupont",
        email: "jean.dupont@entreprise.com",
        avatar: "",
        isClient: true,
      },
      content: "Ticket créé",
      timestamp: new Date("2024-03-15T09:00:00"),
      isSystem: true,
    },
    {
      id: "2",
      author: {
        name: "Support System",
        email: "system@support.com",
        avatar: "",
        isClient: false,
      },
      content: "Ticket assigné à Marie Martin",
      timestamp: new Date("2024-03-15T09:15:00"),
      isSystem: true,
    },
    {
      id: "3",
      author: {
        name: "Marie Martin",
        email: "marie.martin@support.com",
        avatar: "",
        isClient: false,
      },
      content: `Bonjour Jean,

Je viens de prendre connaissance de votre ticket. Je comprends l'urgence de la situation.

Je vais commencer par vérifier l'état du serveur de mon côté. Pouvez-vous me confirmer :
1. Depuis quelle heure exacte rencontrez-vous ce problème ?
2. D'autres collègues ont-ils le même souci ?
3. Avez-vous fait des modifications récentes sur votre poste ?

Je reviens vers vous rapidement.`,
      timestamp: new Date("2024-03-15T09:30:00"),
      isSystem: false,
    },
    {
      id: "4",
      author: {
        name: "Jean Dupont",
        email: "jean.dupont@entreprise.com",
        avatar: "",
        isClient: true,
      },
      content: `Merci pour votre réponse rapide.

1. Le problème a commencé vers 8h30 ce matin
2. Oui, toute mon équipe (5 personnes) a le même problème
3. Aucune modification récente sur nos postes

C'est vraiment urgent car nous avons une présentation client cet après-midi.`,
      timestamp: new Date("2024-03-15T09:45:00"),
      isSystem: false,
    },
  ],
  activities: [
    {
      id: "1",
      type: "created",
      user: "Jean Dupont",
      timestamp: new Date("2024-03-15T09:00:00"),
      details: "Ticket créé",
    },
    {
      id: "2",
      type: "assigned",
      user: "System",
      timestamp: new Date("2024-03-15T09:15:00"),
      details: "Assigné à Marie Martin",
    },
    {
      id: "3",
      type: "status_changed",
      user: "Marie Martin",
      timestamp: new Date("2024-03-15T09:30:00"),
      details: 'Statut changé de "Ouvert" à "En cours"',
    },
    {
      id: "4",
      type: "priority_changed",
      user: "Marie Martin",
      timestamp: new Date("2024-03-15T10:00:00"),
      details: 'Priorité changée de "Moyenne" à "Haute"',
    },
  ],
  relatedTickets: [
    { id: "#1230", title: "Problème réseau salle serveur", status: "resolved" },
    { id: "#1225", title: "Maintenance serveur planifiée", status: "closed" },
  ],
};

const statusOptions = [
  { value: "open", label: "Ouvert", color: "warning" },
  { value: "in-progress", label: "En cours", color: "primary" },
  {
    value: "waiting-for-customer",
    label: "En attente client",
    color: "secondary",
  },
  { value: "resolved", label: "Résolu", color: "success" },
  { value: "closed", label: "Fermé", color: "default" },
];

const priorityOptions = [
  { value: "low", label: "Basse", color: "success" },
  { value: "medium", label: "Moyenne", color: "warning" },
  { value: "high", label: "Haute", color: "danger" },
  { value: "critical", label: "Critique", color: "danger" },
];

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const {
    isOpen: isAssignOpen,
    onOpen: onAssignOpen,
    onClose: onAssignClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [message, setMessage] = React.useState("");
  const [isInternal, setIsInternal] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("messages");
  const [rating, setRating] = React.useState(0);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Sending message:", { message, isInternal });
    setMessage("");
    setIsSending(false);
  };

  const handleStatusChange = (newStatus: string) => {
    console.log("Changing status to:", newStatus);
  };

  const handlePriorityChange = (newPriority: string) => {
    console.log("Changing priority to:", newPriority);
  };

  const calculateSLAProgress = () => {
    const now = new Date();
    const created = ticketData.createdAt;
    const responseDeadline = ticketData.sla.responseDeadline;
    const resolutionDeadline = ticketData.sla.resolutionDeadline;

    const responseProgress = Math.min(
      ((now.getTime() - created.getTime()) /
        (responseDeadline.getTime() - created.getTime())) *
        100,
      100
    );

    const resolutionProgress = Math.min(
      ((now.getTime() - created.getTime()) /
        (resolutionDeadline.getTime() - created.getTime())) *
        100,
      100
    );

    return { responseProgress, resolutionProgress };
  };

  const { responseProgress, resolutionProgress } = calculateSLAProgress();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button isIconOnly variant="light" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{ticketData.id}</h1>
              <Chip
                color={
                  statusOptions.find((s) => s.value === ticketData.status)
                    ?.color as any
                }
                variant="flat"
              >
                {
                  statusOptions.find((s) => s.value === ticketData.status)
                    ?.label
                }
              </Chip>
              <Chip
                color={
                  priorityOptions.find((p) => p.value === ticketData.priority)
                    ?.color as any
                }
                variant="dot"
              >
                {
                  priorityOptions.find((p) => p.value === ticketData.priority)
                    ?.label
                }
              </Chip>
            </div>
            <p className="text-default-600 mt-1">{ticketData.title}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                endContent={<ChevronRight className="w-4 h-4" />}
              >
                Actions
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem startContent={<Edit className="w-4 h-4" />}>
                Modifier
              </DropdownItem>
              <DropdownItem
                startContent={<UserIcon className="w-4 h-4" />}
                onClick={onAssignOpen}
              >
                Réassigner
              </DropdownItem>
              <DropdownItem startContent={<Share2 className="w-4 h-4" />}>
                Partager
              </DropdownItem>
              <DropdownItem startContent={<Printer className="w-4 h-4" />}>
                Imprimer
              </DropdownItem>
              <DropdownItem startContent={<Archive className="w-4 h-4" />}>
                Archiver
              </DropdownItem>
              <DropdownItem
                startContent={<Trash2 className="w-4 h-4" />}
                className="text-danger"
                onClick={onDeleteOpen}
              >
                Supprimer
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Info */}
          <Card>
            <CardBody>
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as string)}
                variant="underlined"
              >
                <Tab key="messages" title="Messages">
                  <div className="space-y-4 mt-4">
                    {/* Messages */}
                    {ticketData.messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {msg.isSystem ? (
                          <div className="flex items-center gap-2 text-sm text-default-500 justify-center py-2">
                            <Activity className="w-4 h-4" />
                            <span>{msg.content}</span>
                            <span>•</span>
                            <span>{msg.timestamp.toLocaleString("fr-FR")}</span>
                          </div>
                        ) : (
                          <div
                            className={`flex gap-3 ${
                              msg.author.isClient ? "" : "flex-row-reverse"
                            }`}
                          >
                            <Avatar
                              name={msg.author.name}
                              size="sm"
                              className="flex-shrink-0"
                            />
                            <div
                              className={`flex-1 ${
                                msg.author.isClient ? "" : "text-right"
                              }`}
                            >
                              <div
                                className={`inline-block ${
                                  msg.author.isClient
                                    ? "bg-default-100"
                                    : "bg-primary text-white"
                                } rounded-lg p-3 max-w-[80%]`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">
                                    {msg.author.name}
                                  </span>
                                  {!msg.author.isClient && (
                                    <Chip
                                      size="sm"
                                      variant="flat"
                                      className="text-xs"
                                    >
                                      Support
                                    </Chip>
                                  )}
                                </div>
                                <p className="whitespace-pre-wrap">
                                  {msg.content}
                                </p>
                                <p
                                  className={`text-xs mt-2 ${
                                    msg.author.isClient
                                      ? "text-default-400"
                                      : "text-primary-100"
                                  }`}
                                >
                                  {msg.timestamp.toLocaleString("fr-FR")}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Message Input */}
                    <Divider className="my-4" />
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Chip
                          variant={isInternal ? "flat" : "bordered"}
                          color={isInternal ? "warning" : "default"}
                          className="cursor-pointer"
                          onClick={() => setIsInternal(!isInternal)}
                        >
                          {isInternal ? "Note interne" : "Réponse client"}
                        </Chip>
                        {isInternal && (
                          <p className="text-xs text-warning">
                            Cette note ne sera visible que par l'équipe support
                          </p>
                        )}
                      </div>

                      <Textarea
                        placeholder={
                          isInternal
                            ? "Ajouter une note interne..."
                            : "Écrire votre réponse..."
                        }
                        value={message}
                        onValueChange={setMessage}
                        minRows={3}
                        maxRows={8}
                      />

                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Button isIconOnly variant="light" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          color="primary"
                          endContent={<Send className="w-4 h-4" />}
                          onClick={handleSendMessage}
                          isLoading={isSending}
                          isDisabled={!message.trim()}
                        >
                          {isSending ? "Envoi..." : "Envoyer"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab key="details" title="Détails">
                  <div className="space-y-6 mt-4">
                    <div>
                      <h3 className="font-semibold mb-3">Description</h3>
                      <p className="whitespace-pre-wrap text-default-700">
                        {ticketData.description}
                      </p>
                    </div>

                    <Divider />

                    <div>
                      <h3 className="font-semibold mb-3">Pièces jointes</h3>
                      <div className="space-y-2">
                        {ticketData.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-3 bg-default-100 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {attachment.type.startsWith("image/") ? (
                                <Image className="w-5 h-5 text-primary" />
                              ) : (
                                <File className="w-5 h-5 text-primary" />
                              )}
                              <div>
                                <p className="font-medium">{attachment.name}</p>
                                <p className="text-xs text-default-500">
                                  {(attachment.size / 1024).toFixed(1)} KB •
                                  Ajouté par {attachment.uploadedBy}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button isIconOnly size="sm" variant="light">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button isIconOnly size="sm" variant="light">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab>

                <Tab key="activity" title="Activité">
                  <div className="space-y-4 mt-4">
                    {ticketData.activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 bg-default-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <History className="w-4 h-4 text-default-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-default-600">
                              {" "}
                              {activity.details}
                            </span>
                          </p>
                          <p className="text-xs text-default-400 mt-1">
                            {activity.timestamp.toLocaleString("fr-FR")}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Actions rapides</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              <Select
                label="Statut"
                value={ticketData.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                size="sm"
              >
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Priorité"
                value={ticketData.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                size="sm"
              >
                {priorityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              <Button
                color="success"
                className="w-full"
                startContent={<CheckCircle className="w-4 h-4" />}
              >
                Marquer comme résolu
              </Button>
            </CardBody>
          </Card>

          {/* SLA Info */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">SLA</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-default-600">
                    Temps de réponse
                  </span>
                  <span className="text-sm font-medium">
                    {ticketData.sla.responseTime}h
                  </span>
                </div>
                <Progress
                  value={responseProgress}
                  color={
                    responseProgress > 80
                      ? "danger"
                      : responseProgress > 60
                      ? "warning"
                      : "success"
                  }
                  size="sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-default-600">
                    Temps de résolution
                  </span>
                  <span className="text-sm font-medium">
                    {ticketData.sla.resolutionTime}h
                  </span>
                </div>
                <Progress
                  value={resolutionProgress}
                  color={
                    resolutionProgress > 80
                      ? "danger"
                      : resolutionProgress > 60
                      ? "warning"
                      : "success"
                  }
                  size="sm"
                />
              </div>
            </CardBody>
          </Card>

          {/* People */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Personnes</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <p className="text-sm text-default-600 mb-2">Créé par</p>
                <User
                  name={ticketData.createdBy.name}
                  description={ticketData.createdBy.email}
                  avatarProps={{
                    name: ticketData.createdBy.name,
                  }}
                />
                <p className="text-xs text-default-500 mt-1">
                  {ticketData.createdBy.department}
                </p>
              </div>

              <Divider />

              <div>
                <p className="text-sm text-default-600 mb-2">Assigné à</p>
                {ticketData.assignedTo ? (
                  <>
                    <User
                      name={ticketData.assignedTo.name}
                      description={ticketData.assignedTo.email}
                      avatarProps={{
                        name: ticketData.assignedTo.name,
                      }}
                    />
                    <p className="text-xs text-default-500 mt-1">
                      {ticketData.assignedTo.role}
                    </p>
                  </>
                ) : (
                  <p className="text-default-400">Non assigné</p>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Related Tickets */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Tickets liés</h3>
            </CardHeader>
            <CardBody>
              {ticketData.relatedTickets.length > 0 ? (
                <div className="space-y-2">
                  {ticketData.relatedTickets.map((ticket) => (
                    <Link
                      key={ticket.id}
                      href={`/dashboard/tickets/${ticket.id}`}
                      className="block p-2 hover:bg-default-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{ticket.id}</p>
                          <p className="text-xs text-default-600 line-clamp-1">
                            {ticket.title}
                          </p>
                        </div>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            ticket.status === "resolved" ? "success" : "default"
                          }
                        >
                          {ticket.status === "resolved" ? "Résolu" : "Fermé"}
                        </Chip>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-default-400 text-sm">Aucun ticket lié</p>
              )}
            </CardBody>
          </Card>

          {/* Satisfaction */}
          {ticketData.status === "resolved" && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Satisfaction</h3>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-default-600 mb-3">
                  Comment évaluez-vous la résolution de ce ticket ?
                </p>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      isIconOnly
                      variant={rating >= star ? "flat" : "light"}
                      color={rating >= star ? "warning" : "default"}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          rating >= star ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  ))}
                </div>
                {rating > 0 && (
                  <Button color="primary" size="sm" className="w-full mt-3">
                    Envoyer l'évaluation
                  </Button>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Assign Modal */}
      <Modal isOpen={isAssignOpen} onClose={onAssignClose}>
        <ModalContent>
          <ModalHeader>Réassigner le ticket</ModalHeader>
          <ModalBody>
            <Select label="Assigner à" placeholder="Sélectionner un agent">
              <SelectItem key="marie" value="marie">
                Marie Martin
              </SelectItem>
              <SelectItem key="pierre" value="pierre">
                Pierre Durand
              </SelectItem>
              <SelectItem key="sophie" value="sophie">
                Sophie Leroy
              </SelectItem>
            </Select>
            <Textarea
              label="Note (optionnel)"
              placeholder="Ajouter une note sur la réassignation..."
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onAssignClose}>
              Annuler
            </Button>
            <Button color="primary" onPress={onAssignClose}>
              Réassigner
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          <ModalHeader>Supprimer le ticket</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-danger flex-shrink-0" />
                <p>
                  Êtes-vous sûr de vouloir supprimer ce ticket ? Cette action
                  est irréversible.
                </p>
              </div>
              <Card className="bg-danger/10">
                <CardBody>
                  <p className="font-medium">
                    {ticketData.id} - {ticketData.title}
                  </p>
                </CardBody>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onDeleteClose}>
              Annuler
            </Button>
            <Button color="danger" onPress={onDeleteClose}>
              Supprimer définitivement
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
