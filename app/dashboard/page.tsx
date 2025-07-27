"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
  Chip,
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from "@nextui-org/react";
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ArrowRight,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Activity,
  Star,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

const statsCards = [
  {
    title: "Tickets Ouverts",
    value: "12",
    change: "+3",
    changeType: "increase",
    icon: Ticket,
    color: "primary",
    description: "Cette semaine",
  },
  {
    title: "Temps Moyen de Résolution",
    value: "2.5h",
    change: "-30min",
    changeType: "decrease",
    icon: Clock,
    color: "secondary",
    description: "vs semaine dernière",
  },
  {
    title: "Taux de Résolution",
    value: "95%",
    change: "+5%",
    changeType: "increase",
    icon: CheckCircle,
    color: "success",
    description: "Ce mois",
  },
  {
    title: "Satisfaction Client",
    value: "4.8/5",
    change: "+0.2",
    changeType: "increase",
    icon: Star,
    color: "warning",
    description: "Moyenne globale",
  },
];

const recentTickets = [
  {
    id: "#1234",
    title: "Problème de connexion au serveur",
    status: "open",
    priority: "high",
    createdAt: "Il y a 5 minutes",
    category: "Infrastructure",
  },
  {
    id: "#1233",
    title: "Demande de migration base de données",
    status: "in-progress",
    priority: "medium",
    createdAt: "Il y a 2 heures",
    category: "Cloud",
  },
  {
    id: "#1232",
    title: "Configuration VPN pour nouveau site",
    status: "open",
    priority: "low",
    createdAt: "Il y a 3 heures",
    category: "Réseau",
  },
  {
    id: "#1231",
    title: "Mise à jour certificat SSL",
    status: "resolved",
    priority: "high",
    createdAt: "Il y a 1 jour",
    category: "Sécurité",
  },
  {
    id: "#1230",
    title: "Optimisation performances API",
    status: "resolved",
    priority: "medium",
    createdAt: "Il y a 2 jours",
    category: "Développement",
  },
];

const activityFeed = [
  {
    id: 1,
    user: "Vous",
    action: "avez créé le ticket",
    target: "#1234",
    time: "Il y a 5 minutes",
    avatar: "JD",
  },
  {
    id: 2,
    user: "Support Team",
    action: "a répondu au ticket",
    target: "#1233",
    time: "Il y a 1 heure",
    avatar: "ST",
  },
  {
    id: 3,
    user: "Système",
    action: "a marqué comme résolu",
    target: "#1231",
    time: "Il y a 2 heures",
    avatar: "SY",
  },
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState("week");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "warning";
      case "in-progress":
        return "primary";
      case "resolved":
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <p className="text-default-600">
            Bienvenue, Jean ! Voici un aperçu de votre activité
          </p>
        </div>
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                endContent={<Calendar className="w-4 h-4" />}
              >
                Cette semaine
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Période"
              selectedKeys={[selectedPeriod]}
              onSelectionChange={(keys) =>
                setSelectedPeriod(Array.from(keys)[0] as string)
              }
            >
              <DropdownItem key="today">Aujourd&apos;hui</DropdownItem>
              <DropdownItem key="week">Cette semaine</DropdownItem>
              <DropdownItem key="month">Ce mois</DropdownItem>
              <DropdownItem key="year">Cette année</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            variant="bordered"
            startContent={<Download className="w-4 h-4" />}
          >
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-default-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          stat.changeType === "increase" ? "success" : "danger"
                        }
                        startContent={
                          stat.changeType === "increase" ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )
                        }
                      >
                        {stat.change}
                      </Chip>
                      <span className="text-xs text-default-500">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Tickets Récents</h3>
              <Button
                as={Link}
                href="/dashboard/tickets"
                size="sm"
                variant="light"
                endContent={<ArrowRight className="w-4 h-4" />}
              >
                Voir tous
              </Button>
            </CardHeader>
            <CardBody className="p-0">
              <Table
                aria-label="Tickets récents"
                removeWrapper
                classNames={{
                  th: "bg-transparent text-default-600 font-medium",
                  td: "py-3",
                }}
              >
                <TableHeader>
                  <TableColumn>TICKET</TableColumn>
                  <TableColumn>STATUT</TableColumn>
                  <TableColumn>PRIORITÉ</TableColumn>
                  <TableColumn>CRÉÉ</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {recentTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.id}</p>
                          <p className="text-sm text-default-600">
                            {ticket.title}
                          </p>
                          <Chip size="sm" variant="flat" className="mt-1">
                            {ticket.category}
                          </Chip>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={getStatusColor(ticket.status)}
                        >
                          {ticket.status === "open" && "Ouvert"}
                          {ticket.status === "in-progress" && "En cours"}
                          {ticket.status === "resolved" && "Résolu"}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Chip
                          size="sm"
                          variant="dot"
                          color={getPriorityColor(ticket.priority)}
                        >
                          {ticket.priority === "high" && "Haute"}
                          {ticket.priority === "medium" && "Moyenne"}
                          {ticket.priority === "low" && "Basse"}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-sm text-default-600">
                        {ticket.createdAt}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            as={Link}
                            href={`/dashboard/tickets/${ticket.id}`}
                            size="sm"
                            variant="light"
                            isIconOnly
                            aria-label="Voir le ticket"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {/* <Dropdown>
                            <DropdownTrigger>
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                aria-label="Plus d'actions"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Actions ticket">
                              <DropdownItem
                                startContent={
                                  <MessageSquare className="w-4 h-4" />
                                }
                              >
                                Répondre
                              </DropdownItem>
                              <DropdownItem
                                startContent={<Users className="w-4 h-4" />}
                              >
                                Assigner
                              </DropdownItem>
                              <DropdownItem
                                startContent={
                                  <CheckCircle className="w-4 h-4" />
                                }
                              >
                                Marquer comme résolu
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>

        {/* Activity Feed & Quick Stats */}
        <div className="space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Performance</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-default-600">
                      Résolution 1er contact
                    </span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} color="success" size="sm" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-default-600">
                      SLA respecté
                    </span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} color="primary" size="sm" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-default-600">
                      Tickets en retard
                    </span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                  <Progress value={8} color="danger" size="sm" />
                </div>
              </div>

              <Button
                as={Link}
                href="/dashboard/stats"
                variant="flat"
                className="w-full mt-4"
                endContent={<BarChart3 className="w-4 h-4" />}
              >
                Voir les statistiques détaillées
              </Button>
            </CardBody>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Activité Récente</h3>
              <Button size="sm" variant="light" isIconOnly aria-label="Filtrer">
                <Filter className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {activityFeed.map((activity, index) => (
                  <div key={activity.id} className="flex gap-3">
                    <Avatar
                      size="sm"
                      name={activity.avatar}
                      className="flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-default-600">
                          {activity.action}
                        </span>{" "}
                        <Link href="#" size="sm" className="font-medium">
                          {activity.target}
                        </Link>
                      </p>
                      <p className="text-xs text-default-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                as={Link}
                href="/dashboard/activity"
                variant="light"
                className="w-full mt-4"
                size="sm"
              >
                Voir toute l&apos;activité
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
