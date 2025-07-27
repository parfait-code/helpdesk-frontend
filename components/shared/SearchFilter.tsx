"use client";

import React from "react";
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Chip,
  Badge,
  Divider,
} from "@nextui-org/react";
import { Search, Filter, X, RefreshCw, ChevronDown } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  type: "select" | "checkbox" | "radio";
  options: FilterOption[];
}

interface SearchFilterProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterGroups?: FilterGroup[];
  activeFilters?: Record<string, string | string[]>;
  onFiltersChange?: (filters: Record<string, string | string[]>) => void;
  onReset?: () => void;
  showFilterCount?: boolean;
  className?: string;
}

export default function SearchFilter({
  searchPlaceholder = "Rechercher...",
  searchValue,
  onSearchChange,
  filterGroups = [],
  activeFilters = {},
  onFiltersChange,
  onReset,
  showFilterCount = true,
  className = "",
}: SearchFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [tempFilters, setTempFilters] = React.useState(activeFilters);

  // Calculer le nombre de filtres actifs
  const activeFilterCount = React.useMemo(() => {
    return Object.values(activeFilters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return value ? count + 1 : count;
    }, 0);
  }, [activeFilters]);

  const handleFilterChange = (groupId: string, value: string | string[]) => {
    const newFilters = { ...tempFilters };

    if (!value || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[groupId];
    } else {
      newFilters[groupId] = value;
    }

    setTempFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange?.(tempFilters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setTempFilters({});
    onFiltersChange?.({});
    onSearchChange("");
    onReset?.();
  };

  const renderFilterGroup = (group: FilterGroup) => {
    const currentValue = tempFilters[group.id];

    switch (group.type) {
      case "select":
        return (
          <Select
            label={group.label}
            value={(currentValue as string) || ""}
            onChange={(e) => handleFilterChange(group.id, e.target.value)}
            size="sm"
          >
            <SelectItem key="" value="">
              Tous
            </SelectItem>
            {group.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
                {option.count !== undefined && (
                  <span className="text-default-400 ml-1">
                    ({option.count})
                  </span>
                )}
              </SelectItem>
            ))}
          </Select>
        );

      case "checkbox":
        return (
          <div>
            <p className="text-sm font-medium mb-2">{group.label}</p>
            <CheckboxGroup
              value={(currentValue as string[]) || []}
              onValueChange={(value) => handleFilterChange(group.id, value)}
            >
              {group.options.map((option) => (
                <Checkbox key={option.value} value={option.value} size="sm">
                  <span className="text-sm">
                    {option.label}
                    {option.count !== undefined && (
                      <span className="text-default-400 ml-1">
                        ({option.count})
                      </span>
                    )}
                  </span>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            label={group.label}
            value={(currentValue as string) || ""}
            onValueChange={(value) => handleFilterChange(group.id, value)}
            size="sm"
          >
            <Radio value="">Tous</Radio>
            {group.options.map((option) => (
              <Radio key={option.value} value={option.value}>
                {option.label}
                {option.count !== undefined && (
                  <span className="text-default-400 ml-1">
                    ({option.count})
                  </span>
                )}
              </Radio>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {/* Search Input */}
      <div className="flex-1">
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onValueChange={onSearchChange}
          startContent={<Search className="w-4 h-4 text-default-400" />}
          endContent={
            searchValue && (
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => onSearchChange("")}
              >
                <X className="w-4 h-4" />
              </Button>
            )
          }
        />
      </div>

      {/* Filter Button */}
      {filterGroups.length > 0 && (
        <div className="flex gap-2">
          <Popover
            isOpen={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            placement="bottom-end"
          >
            <PopoverTrigger>
              <Button
                variant="flat"
                startContent={<Filter className="w-4 h-4" />}
                endContent={
                  showFilterCount &&
                  activeFilterCount > 0 && (
                    <Badge
                      content={activeFilterCount}
                      color="primary"
                      size="sm"
                    />
                  )
                }
              >
                Filtres
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Filtres</h4>
                  {activeFilterCount > 0 && (
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setTempFilters({})}
                    >
                      Effacer
                    </Button>
                  )}
                </div>

                <Divider />

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filterGroups.map((group) => (
                    <div key={group.id}>{renderFilterGroup(group)}</div>
                  ))}
                </div>

                <Divider />

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    className="flex-1"
                    onClick={() => {
                      setTempFilters(activeFilters);
                      setIsFilterOpen(false);
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    size="sm"
                    color="primary"
                    className="flex-1"
                    onClick={handleApplyFilters}
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {(activeFilterCount > 0 || searchValue) && (
            <Button
              isIconOnly
              variant="flat"
              onClick={handleResetFilters}
              aria-label="Réinitialiser les filtres"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {Object.entries(activeFilters).map(([groupId, values]) => {
            const group = filterGroups.find((g) => g.id === groupId);
            if (!group) return null;

            const renderChip = (value: string) => {
              const option = group.options.find((o) => o.value === value);
              return (
                <Chip
                  key={`${groupId}-${value}`}
                  size="sm"
                  onClose={() => {
                    if (Array.isArray(values)) {
                      const newValues = values.filter((v) => v !== value);
                      handleFilterChange(groupId, newValues);
                      onFiltersChange?.({
                        ...activeFilters,
                        [groupId]: newValues,
                      });
                    } else {
                      handleFilterChange(groupId, "");
                      const newFilters = { ...activeFilters };
                      delete newFilters[groupId];
                      onFiltersChange?.(newFilters);
                    }
                  }}
                >
                  {group.label}: {option?.label || value}
                </Chip>
              );
            };

            if (Array.isArray(values)) {
              return values.map(renderChip);
            }
            return values ? renderChip(values) : null;
          })}
        </div>
      )}
    </div>
  );
}
