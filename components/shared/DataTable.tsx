"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
import EmptyState from "./EmptyState";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  align?: "start" | "center" | "end";
  width?: string | number;
}

export interface Action<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  isDisabled?: (item: T) => boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  isLoading?: boolean;
  emptyStateProps?: {
    icon: any;
    title: string;
    description: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  selectionMode?: "single" | "multiple" | "none";
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (column: string) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
  rowsPerPageOptions?: number[];
  getRowKey?: (item: T) => string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  data,
  actions,
  isLoading = false,
  emptyStateProps,
  selectionMode = "none",
  selectedKeys,
  onSelectionChange,
  sortBy,
  sortOrder = "asc",
  onSortChange,
  page = 1,
  totalPages = 1,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
  getRowKey = (item) => item.id || JSON.stringify(item),
  onRowClick,
  className = "",
}: DataTableProps<T>) {
  const renderCell = (item: T, columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);

    if (column?.render) {
      return column.render(item);
    }

    const value = item[columnKey];

    // Rendu par défaut pour différents types
    if (value === null || value === undefined) {
      return <span className="text-default-400">-</span>;
    }

    if (typeof value === "boolean") {
      return (
        <Chip size="sm" color={value ? "success" : "default"} variant="flat">
          {value ? "Oui" : "Non"}
        </Chip>
      );
    }

    if (value instanceof Date) {
      return value.toLocaleDateString("fr-FR");
    }

    return value;
  };

  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable || !onSortChange) return null;

    if (sortBy !== column.key) {
      return <ChevronDown className="w-4 h-4 text-default-400" />;
    }

    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSortChange) return;
    onSortChange(column.key);
  };

  const renderActions = (item: T) => {
    if (!actions || actions.length === 0) return null;

    if (actions.length === 1) {
      const action = actions[0];
      return (
        <Button
          size="sm"
          variant="light"
          color={action.color}
          isDisabled={action.isDisabled?.(item)}
          onPress={() => action.onClick(item)}
          startContent={action.icon}
        >
          {action.label}
        </Button>
      );
    }

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {actions.map((action, index) => (
            <DropdownItem
              key={index}
              color={action.color}
              isDisabled={action.isDisabled?.(item)}
              onClick={() => action.onClick(item)}
              startContent={action.icon}
            >
              {action.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  const bottomContent = React.useMemo(() => {
    if (totalPages <= 1 && !onRowsPerPageChange) return null;

    return (
      <div className="flex justify-between items-center px-2 py-4">
        <div className="flex items-center gap-2">
          {onRowsPerPageChange && (
            <>
              <span className="text-small text-default-400">
                Lignes par page:
              </span>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    size="sm"
                    endContent={<ChevronDown className="w-4 h-4" />}
                  >
                    {rowsPerPage}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectedKeys={[rowsPerPage.toString()]}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0];
                    onRowsPerPageChange(Number(value));
                  }}
                >
                  {rowsPerPageOptions.map((option) => (
                    <DropdownItem key={option.toString()}>
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </div>

        {totalPages > 1 && onPageChange && (
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPages}
            onChange={onPageChange}
          />
        )}
      </div>
    );
  }, [
    page,
    totalPages,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
  ]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (data.length === 0 && emptyStateProps) {
    return <EmptyState {...emptyStateProps} />;
  }

  return (
    <Table
      aria-label="Data table"
      selectionMode={selectionMode}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      bottomContent={bottomContent}
      className={className}
      classNames={{
        wrapper: "max-h-[600px]",
      }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn
            key={column.key}
            align={column.align}
            width={column.width}
            allowsSorting={column.sortable}
          >
            {column.sortable ? (
              <Button
                variant="light"
                size="sm"
                className="p-0 min-w-0 h-auto font-medium"
                endContent={renderSortIcon(column)}
                onPress={() => handleSort(column)}
              >
                {column.label}
              </Button>
            ) : (
              column.label
            )}
          </TableColumn>
        ))}
        {actions && actions.length > 0 && (
          <TableColumn align="center" width={100}>
            Actions
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="Aucune donnée disponible">
        {data.map((item) => (
          <TableRow
            key={getRowKey(item)}
            className={onRowClick ? "cursor-pointer hover:bg-default-100" : ""}
            onClick={() => onRowClick?.(item)}
          >
            {columns.map((column) => (
              <TableCell key={column.key}>
                {renderCell(item, column.key)}
              </TableCell>
            ))}
            {actions && actions.length > 0 && (
              <TableCell>{renderActions(item)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
