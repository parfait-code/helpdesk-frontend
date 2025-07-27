"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Button,
  Chip,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Ticket,
  Activity,
  PieChart,
  LineChart,
  Target,
  Award,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock data pour les graphiques
const ticketTrends = [
  { date: "Lun", created: 12, resolved: 10 },
  { date: "Mar", created: 15, resolved: 14 },
  { date: "Mer", created: 18, resolved: 16 },
  { date: "Jeu", created: 14, resolved: 15 },
  { date: "Ven", created: 20, resolved: 18 },
  { date: "Sam", created: 8, resolved: 8 },
  { date: "Dim", created: 5, resolved: 5 },
];

const categoryDistribution = [
  { name: "HelpDesk", value: 35, color: "primary" },
  { name: "Infrastructure", value: 25, color: "success" },
  { name: "Cloud", value: 20, color: "secondary" },
  { name: "Réseau", value: 10, color: "warning" },
  { name: "Sécurité", value: 7, color: "danger" },
  { name: "Développement", value: 3, color: "default" },
];

const topAgents = [
  {
    name: "Marie Martin",
    tickets: 45,
    satisfaction: 4.8,
    responseTime: "1.2h",
  },
  {
    name: "Pierre Durand",
    tickets: 38,
    satisfaction: 4.6,
    responseTime: "1.5h",
  },
  {
    name: "Sophie Leroy",
    tickets: 32,
    satisfaction: 4.9,
    responseTime: "1.8h",
  },
  {
    name: "Thomas Bernard",
    tickets: 28,
    satisfaction: 4.5,
    responseTime: "2.1h",
  },
  {
    name: "Julie Moreau",
    tickets: 25,
    satisfaction: 4.7,
    responseTime: "1.9h",
  },
];

const kpiData = [
  {
    title: "Tickets créés",
    value: 156,
    change: 12,
    changeType: "increase",
    icon: Ticket,
    color: "primary",
    period: "vs mois dernier",
  },
  {
    title: "Tickets résolus",
    value: 142,
    change: 8,
    changeType: "increase",
    icon: CheckCircle,
    color: "success",
    period: "vs mois dernier",
  },
  {
    title: "Temps moyen de résolution",
    value: "2.5h",
    change: -0.5,
    changeType: "decrease",
    icon: Clock,
    color: "secondary",
    period: "amélioration",
  },
  {
    title: "Taux de satisfaction",
    value: "95%",
    change: 3,
    changeType: "increase",
    icon: Award,
    color: "warning",
    period: "vs mois dernier",
  },
];

const slaMetrics = [
  {
    name: "Temps de première réponse",
    target: "< 2h",
    actual: "1.5h",
    compliance: 92,
  },
  {
    name: "Temps de résolution",
    target: "< 8h",
    actual: "6.2h",
    compliance: 88,
  },
  {
    name: "Taux de résolution premier contact",
    target: "> 70%",
    actual: "75%",
    compliance: 100,
  },
  {
    name: "Satisfaction client",
    target: "> 4.5/5",
    actual: "4.7/5",
    compliance: 100,
  },
];

export default function StatsPage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState("month");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedTab, setSelectedTab] = React.useState("overview");

  const periods = [
    { value: "today", label: "Aujourd'hui" },
    { value: "week", label: "Cette semaine" },
    { value: "month", label: "Ce mois" },
    { value: "quarter", label: "Ce trimestre" },
    { value: "year", label: "Cette année" },
  ];

  const getChangeIcon = (changeType: string) => {
    if (changeType === "increase") return <ArrowUp className="w-4 h-4" />;
    if (changeType === "decrease") return <ArrowDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return "success";
    if (compliance >= 70) return "warning";
    return "danger";
  };

  // Composant de graphique simple (barre)
  const SimpleBarChart = ({ data }: { data: typeof ticketTrends }) => {
    const maxValue = Math.max(...data.flatMap((d) => [d.created, d.resolved]));

    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-default-600">{item.date}</span>
              <div className="flex gap-4">
                <span className="text-primary">Créés: {item.created}</span>
                <span className="text-success">Résolus: {item.resolved}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 bg-default-100 rounded-full h-2 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary"
                  style={{ width: `${(item.created / maxValue) * 100}%` }}
                />
              </div>
              <div className="flex-1 bg-default-100 rounded-full h-2 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-success"
                  style={{ width: `${(item.resolved / maxValue) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Composant de graphique simple (donut)
  const SimpleDonutChart = ({
    data,
  }: {
    data: typeof categoryDistribution;
  }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center gap-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage} ${100 - percentage}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += percentage;

              return (
                <circle
                  key={index}
                  cx="50%"
                  cy="50%"
                  r="40%"
                  fill="none"
                  stroke={`hsl(var(--heroui-${item.color}))`}
                  strokeWidth="20%"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-default-500">Total</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-${item.color}`} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Statistiques</h1>
          <p className="text-default-600">
            Analysez les performances de votre support
          </p>
        </div>

        <div className="flex gap-2">
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-40"
            size="sm"
          >
            {periods.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            variant="flat"
            startContent={<Download className="w-4 h-4" />}
          >
            Exporter
          </Button>

          <Button
            isIconOnly
            variant="flat"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
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
                    <p className="text-sm text-default-600">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center gap-2">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          kpi.changeType === "increase" ? "success" : "danger"
                        }
                        startContent={getChangeIcon(kpi.changeType)}
                      >
                        {Math.abs(kpi.change)}
                        {typeof kpi.value === "string" &&
                        kpi.value.includes("h")
                          ? "h"
                          : "%"}
                      </Chip>
                      <span className="text-xs text-default-500">
                        {kpi.period}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${kpi.color}/10`}>
                    <kpi.icon className={`w-6 h-6 text-${kpi.color}`} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardBody>
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            variant="underlined"
          >
            <Tab
              key="overview"
              title={
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Vue d'ensemble</span>
                </div>
              }
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Tendance des tickets */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      Tendance des tickets
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <SimpleBarChart data={ticketTrends} />
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="text-sm">Créés</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full" />
                        <span className="text-sm">Résolus</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Distribution par catégorie */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      Distribution par catégorie
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <SimpleDonutChart data={categoryDistribution} />
                  </CardBody>
                </Card>

                {/* Métriques SLA */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Conformité SLA</h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      {slaMetrics.map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{metric.name}</p>
                              <p className="text-sm text-default-500">
                                Objectif: {metric.target} • Actuel:{" "}
                                {metric.actual}
                              </p>
                            </div>
                            <Chip
                              size="sm"
                              color={
                                getComplianceColor(metric.compliance) as any
                              }
                              variant="flat"
                            >
                              {metric.compliance}%
                            </Chip>
                          </div>
                          <Progress
                            value={metric.compliance}
                            color={getComplianceColor(metric.compliance) as any}
                            size="sm"
                          />
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab
              key="performance"
              title={
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Performance</span>
                </div>
              }
            >
              <div className="space-y-6 mt-6">
                {/* Top Agents */}
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Top agents</h3>
                    <Chip size="sm" variant="flat">
                      Ce mois
                    </Chip>
                  </CardHeader>
                  <CardBody className="p-0">
                    <Table removeWrapper>
                      <TableHeader>
                        <TableColumn>Agent</TableColumn>
                        <TableColumn>Tickets résolus</TableColumn>
                        <TableColumn>Satisfaction</TableColumn>
                        <TableColumn>Temps de réponse</TableColumn>
                        <TableColumn>Performance</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {topAgents.map((agent, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {index === 0 && (
                                  <Award className="w-4 h-4 text-warning" />
                                )}
                                <span className="font-medium">
                                  {agent.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{agent.tickets}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span>{agent.satisfaction}</span>
                                <span className="text-warning">★</span>
                              </div>
                            </TableCell>
                            <TableCell>{agent.responseTime}</TableCell>
                            <TableCell>
                              <Progress
                                value={
                                  (agent.tickets / topAgents[0].tickets) * 100
                                }
                                color="primary"
                                size="sm"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>

                {/* Performance par période */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-default-600">
                          Pic d'activité
                        </p>
                        <Clock className="w-4 h-4 text-default-400" />
                      </div>
                      <p className="text-2xl font-bold">10h - 12h</p>
                      <p className="text-sm text-default-500 mt-1">
                        35% des tickets créés
                      </p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-default-600">
                          Jour le plus chargé
                        </p>
                        <Calendar className="w-4 h-4 text-default-400" />
                      </div>
                      <p className="text-2xl font-bold">Mercredi</p>
                      <p className="text-sm text-default-500 mt-1">
                        22% des tickets hebdomadaires
                      </p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-default-600">Temps calme</p>
                        <Zap className="w-4 h-4 text-default-400" />
                      </div>
                      <p className="text-2xl font-bold">Weekend</p>
                      <p className="text-sm text-default-500 mt-1">
                        -65% de tickets
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>

            <Tab
              key="trends"
              title={
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Tendances</span>
                </div>
              }
            >
              <div className="space-y-6 mt-6">
                {/* Évolution mensuelle */}
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      Évolution sur 12 mois
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-4">
                      <div className="grid grid-cols-12 gap-1">
                        {Array.from({ length: 12 }, (_, i) => {
                          const height = Math.random() * 80 + 20;
                          return (
                            <div key={i} className="flex flex-col items-center">
                              <div
                                className="w-full bg-primary rounded-t"
                                style={{ height: `${height}px` }}
                              />
                              <span className="text-xs text-default-400 mt-1">
                                {
                                  [
                                    "J",
                                    "F",
                                    "M",
                                    "A",
                                    "M",
                                    "J",
                                    "J",
                                    "A",
                                    "S",
                                    "O",
                                    "N",
                                    "D",
                                  ][i]
                                }
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Prédictions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-primary">
                    <CardBody>
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">
                            Prévision du mois prochain
                          </p>
                          <p className="text-sm text-default-600 mt-1">
                            Basé sur les tendances actuelles
                          </p>
                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Tickets attendus</span>
                              <span className="font-medium">165-180</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">
                                Temps de résolution
                              </span>
                              <span className="font-medium">2.3h</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">
                                Satisfaction prévue
                              </span>
                              <span className="font-medium">96%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="border-warning">
                    <CardBody>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                        <div>
                          <p className="font-semibold">Points d'attention</p>
                          <p className="text-sm text-default-600 mt-1">
                            Tendances nécessitant une vigilance
                          </p>
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-warning rounded-full" />
                              <span>
                                Augmentation des tickets Infrastructure
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-warning rounded-full" />
                              <span>
                                Temps de résolution Sécurité en hausse
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-warning rounded-full" />
                              <span>Pic d'activité le vendredi après-midi</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
