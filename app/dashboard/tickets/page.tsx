"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Checkbox,
  CheckboxGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
  Tabs,
  Tab,
} from "@nextui-org/react";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Ticket,
  Calendar,
  SortAsc,
  SortDesc,
  RefreshCw,
  Archive,
  Trash2,
  Users,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Mock data
const ticketsData = [
  {
    id: "#1234",
    title: "Problème de connexion au serveur",
    description:
      "Impossible de se connecter au serveur principal depuis ce matin",
    status: "open",
    priority: "high",
    category: "Infrastructure",
    createdBy: "Jean Dupont",
    assignedTo: "Support Team",
    createdAt: new Date("2024-03-15T09:00:00"),
    updatedAt: new Date("2024-03-15T14:30:00"),
    messages: 3,
    attachments: 2,
  },
  {
    id: "#1233",
    title: "Demande de migration base de données",
    description: "Migration de PostgreSQL vers AWS RDS",
    status: "in-progress",
    priority: "medium",
    category: "Cloud",
    createdBy: "Marie Martin",
    assignedTo: "Cloud Team",
    createdAt: new Date("2024-03-14T14:00:00"),
    updatedAt: new Date("2024-03-15T10:00:00"),
    messages: 5,
    attachments: 1,
  },
  {
    id: "#1232",
    title: "Configuration VPN pour nouveau site",
    description:
      "Besoin de configurer un VPN site-to-site pour la nouvelle filiale",
    status: "open",
    priority: "low",
    category: "Réseau",
    createdBy: "Paul Bernard",
    assignedTo: null,
    createdAt: new Date("2024-03-14T11:00:00"),
    updatedAt: new Date("2024-03-14T11:00:00"),
    messages: 1,
    attachments: 0,
  },
  {
    id: "#1231",
    title: "Mise à jour certificat SSL",
    description: "Le certificat SSL expire dans 7 jours",
    status: "resolved",
    priority: "high",
    category: "Sécurité",
    createdBy: "Sophie Leroy",
    assignedTo: "Security Team",
    createdAt: new Date("2024-03-13T08:00:00"),
    updatedAt: new Date("2024-03-14T16:00:00"),
    messages: 8,
    attachments: 3,
  },
  {
    id: "#1230",
    title: "Optimisation performances API",
    description: "L'API met trop de temps à répondre sur certains endpoints",
    status: "resolved",
    priority: "medium",
    category: "Développement",
    createdBy: "Lucas Moreau",
    assignedTo: "Dev Team",
    createdAt: new Date("2024-03-12T15:00:00"),
    updatedAt: new Date("2024-03-13T18:00:00"),
    messages: 12,
    attachments: 4,
  },
];

const statusOptions = [
  { value: "all", label: "Tous les statuts" },
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
  { value: "all", label: "Toutes les priorités" },
  { value: "low", label: "Basse", color: "success" },
  { value: "medium", label: "Moyenne", color: "warning" },
  { value: "high", label: "Haute", color: "danger" },
  { value: "critical", label: "Critique", color: "danger" },
];

const categoryOptions = [
  { value: "all", label: "Toutes les catégories" },
  { value: "helpdesk", label: "HelpDesk" },
  { value: "cloud", label: "Cloud" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "network", label: "Réseau" },
  { value: "security", label: "Sécurité" },
  { value: "development", label: "Développement" },
];

export default function TicketsPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState("all");
  const [searchValue, setSearchValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [priorityFilter, setPriorityFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [selectedTickets, setSelectedTickets] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Filter tickets based on selected filters
  const filteredTickets = React.useMemo(() => {
    let filtered = [...ticketsData];

    // Tab filter
    if (selectedTab !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === selectedTab);
    }

    // Search filter
    if (searchValue) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchValue.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (ticket) => ticket.priority === priorityFilter
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (ticket) => ticket.category.toLowerCase() === categoryFilter
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [
    selectedTab,
    searchValue,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
    sortOrder,
  ]);

  // Pagination
  const paginatedTickets = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredTickets.slice(start, end);
  }, [filteredTickets, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage);

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return statusOption?.color || "default";
  };

  const getPriorityColor = (priority: string) => {
    const priorityOption = priorityOptions.find(
      (opt) => opt.value === priority
    );
    return priorityOption?.color || "default";
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const handleBulkAction = (action: string) => {
    console.log("Bulk action:", action, "on tickets:", selectedTickets);
    // Implement bulk actions
  };

  const tabCounts = React.useMemo(() => {
    const counts = {
      all: ticketsData.length,
      open: ticketsData.filter((t) => t.status === "open").length,
      "in-progress": ticketsData.filter((t) => t.status === "in-progress")
        .length,
      resolved: ticketsData.filter((t) => t.status === "resolved").length,
      closed: ticketsData.filter((t) => t.status === "closed").length,
    };
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tickets</h1>
          <p className="text-default-600">
            Gérez tous vos tickets de support en un seul endroit
          </p>
        </div>
        <Button
          color="primary"
          startContent={<Plus className="w-4 h-4" />}
          onClick={() => router.push("/dashboard/tickets/new")}
        >
          Nouveau ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-600">Total</p>
                <p className="text-2xl font-bold">{ticketsData.length}</p>
              </div>
              <Ticket className="w-8 h-8 text-primary" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-600">Ouverts</p>
                <p className="text-2xl font-bold text-warning">
                  {tabCounts.open}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-warning" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-600">En cours</p>
                <p className="text-2xl font-bold text-primary">
                  {tabCounts["in-progress"]}
                </p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-default-600">Résolus</p>
                <p className="text-2xl font-bold text-success">
                  {tabCounts.resolved}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardBody>
          <div className="space-y-4">
            {/* Tabs */}
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key as string)}
              variant="underlined"
              color="primary"
            >
              <Tab
                key="all"
                title={
                  <div className="flex items-center gap-2">
                    <span>Tous</span>
                    <Chip size="sm" variant="flat">
                      {tabCounts.all}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="open"
                title={
                  <div className="flex items-center gap-2">
                    <span>Ouverts</span>
                    <Chip size="sm" variant="flat" color="warning">
                      {tabCounts.open}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="in-progress"
                title={
                  <div className="flex items-center gap-2">
                    <span>En cours</span>
                    <Chip size="sm" variant="flat" color="primary">
                      {tabCounts["in-progress"]}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="resolved"
                title={
                  <div className="flex items-center gap-2">
                    <span>Résolus</span>
                    <Chip size="sm" variant="flat" color="success">
                      {tabCounts.resolved}
                    </Chip>
                  </div>
                }
              />
              <Tab
                key="closed"
                title={
                  <div className="flex items-center gap-2">
                    <span>Fermés</span>
                    <Chip size="sm" variant="flat">
                      {tabCounts.closed}
                    </Chip>
                  </div>
                }
              />
            </Tabs>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Rechercher par ID, titre ou description..."
                value={searchValue}
                onValueChange={setSearchValue}
                startContent={<Search className="w-4 h-4 text-default-400" />}
                className="flex-1"
              />

              <div className="flex gap-2">
                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <Button
                      variant="flat"
                      startContent={<Filter className="w-4 h-4" />}
                    >
                      Filtres
                      {(statusFilter !== "all" ||
                        priorityFilter !== "all" ||
                        categoryFilter !== "all") && (
                        <Badge content="" color="primary" size="sm" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4 p-4">
                      <Select
                        label="Statut"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
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
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        size="sm"
                      >
                        {priorityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <Select
                        label="Catégorie"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        size="sm"
                      >
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="flat"
                          className="flex-1"
                          onClick={() => {
                            setStatusFilter("all");
                            setPriorityFilter("all");
                            setCategoryFilter("all");
                          }}
                        >
                          Réinitialiser
                        </Button>
                        <Button size="sm" color="primary" className="flex-1">
                          Appliquer
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  isIconOnly
                  variant="flat"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>

                <Button isIconOnly variant="flat">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedTickets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-4 p-4 bg-default-100 rounded-lg"
              >
                <span className="text-sm">
                  {selectedTickets.length} ticket(s) sélectionné(s)
                </span>
                <div className="flex gap-2 ml-auto">
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<Users className="w-4 h-4" />}
                    onClick={() => handleBulkAction("assign")}
                  >
                    Assigner
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="success"
                    startContent={<CheckCircle className="w-4 h-4" />}
                    onClick={() => handleBulkAction("resolve")}
                  >
                    Résoudre
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    startContent={<Archive className="w-4 h-4" />}
                    onClick={() => handleBulkAction("archive")}
                  >
                    Archiver
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardBody className="p-0">
          <Table
            aria-label="Tickets table"
            removeWrapper
            onSelectionChange={(keys) => {
              if (keys === "all") {
                setSelectedTickets(paginatedTickets.map((t) => t.id));
              } else {
                setSelectedTickets(Array.from(keys) as string[]);
              }
            }}
            selectionMode="multiple"
            selectedKeys={new Set(selectedTickets)}
            bottomContent={
              totalPages > 1 && (
                <div className="flex w-full justify-center p-4">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={totalPages}
                    onChange={setPage}
                  />
                </div>
              )
            }
          >
            <TableHeader>
              <TableColumn key="select" width="50">
                <Checkbox
                  isSelected={
                    selectedTickets.length === paginatedTickets.length
                  }
                  onValueChange={(checked) => {
                    if (checked) {
                      setSelectedTickets(paginatedTickets.map((t) => t.id));
                    } else {
                      setSelectedTickets([]);
                    }
                  }}
                />
              </TableColumn>
              <TableColumn key="id">ID</TableColumn>
              <TableColumn key="title">
                <Button
                  variant="light"
                  size="sm"
                  className="p-0"
                  endContent={
                    sortBy === "title" ? (
                      sortOrder === "asc" ? (
                        <SortAsc className="w-4 h-4" />
                      ) : (
                        <SortDesc className="w-4 h-4" />
                      )
                    ) : null
                  }
                  onClick={() => handleSort("title")}
                >
                  Titre
                </Button>
              </TableColumn>
              <TableColumn key="status">Statut</TableColumn>
              <TableColumn key="priority">Priorité</TableColumn>
              <TableColumn key="category">Catégorie</TableColumn>
              <TableColumn key="assignedTo">Assigné à</TableColumn>
              <TableColumn key="createdAt">
                <Button
                  variant="light"
                  size="sm"
                  className="p-0"
                  endContent={
                    sortBy === "createdAt" ? (
                      sortOrder === "asc" ? (
                        <SortAsc className="w-4 h-4" />
                      ) : (
                        <SortDesc className="w-4 h-4" />
                      )
                    ) : null
                  }
                  onClick={() => handleSort("createdAt")}
                >
                  Créé le
                </Button>
              </TableColumn>
              <TableColumn key="actions" width="100">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody emptyContent="Aucun ticket trouvé">
              {paginatedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Checkbox
                      isSelected={selectedTickets.includes(ticket.id)}
                      onValueChange={(checked) => {
                        if (checked) {
                          setSelectedTickets([...selectedTickets, ticket.id]);
                        } else {
                          setSelectedTickets(
                            selectedTickets.filter((id) => id !== ticket.id)
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{ticket.id}</span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium line-clamp-1">{ticket.title}</p>
                      <p className="text-xs text-default-500 line-clamp-1">
                        {ticket.description}
                      </p>
                      <div className="flex gap-2">
                        {ticket.messages > 0 && (
                          <div className="flex items-center gap-1 text-xs text-default-500">
                            <MessageSquare className="w-3 h-3" />
                            <span>{ticket.messages}</span>
                          </div>
                        )}
                        {ticket.attachments > 0 && (
                          <div className="flex items-center gap-1 text-xs text-default-500">
                            <FileText className="w-3 h-3" />
                            <span>{ticket.attachments}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={getStatusColor(ticket.status) as any}
                    >
                      {
                        statusOptions.find((s) => s.value === ticket.status)
                          ?.label
                      }
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="dot"
                      color={getPriorityColor(ticket.priority) as any}
                    >
                      {
                        priorityOptions.find((p) => p.value === ticket.priority)
                          ?.label
                      }
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat">
                      {ticket.category}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {ticket.assignedTo ? (
                      <User
                        name={ticket.assignedTo}
                        description={ticket.createdBy}
                        avatarProps={{
                          size: "sm",
                          name: ticket.assignedTo,
                        }}
                      />
                    ) : (
                      <span className="text-default-400">Non assigné</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">
                        {ticket.createdAt.toLocaleDateString("fr-FR")}
                      </p>
                      <p className="text-xs text-default-500">
                        {ticket.createdAt.toLocaleTimeString("fr-FR")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onClick={() =>
                          router.push(`/dashboard/tickets/${ticket.id}`)
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            startContent={<MessageSquare className="w-4 h-4" />}
                          >
                            Répondre
                          </DropdownItem>
                          <DropdownItem
                            startContent={<Users className="w-4 h-4" />}
                          >
                            Assigner
                          </DropdownItem>
                          <DropdownItem
                            startContent={<CheckCircle className="w-4 h-4" />}
                          >
                            Marquer comme résolu
                          </DropdownItem>
                          <DropdownItem
                            startContent={<Archive className="w-4 h-4" />}
                          >
                            Archiver
                          </DropdownItem>
                          <DropdownItem
                            startContent={<Trash2 className="w-4 h-4" />}
                            className="text-danger"
                          >
                            Supprimer
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
