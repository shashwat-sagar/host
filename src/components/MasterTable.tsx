import React, { useMemo, useState, useEffect } from "react";
import { Table, Input, Button, Card, message, Spin } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { RiFileExcel2Line } from "react-icons/ri";
import { exportTableToExcel } from "./ExcelExporter";
import { useSearch } from "../hooks/useSearch";
import { GetRowKey } from "antd/es/table/interface";
import { MdWifiTetheringErrorRounded } from "react-icons/md";
import { moneyFormatter } from "../utilities/utils";
interface MasterTableProps<T extends Record<string, any>> {
  title?: string;
  initialPayload?: Record<string, any>;
  columns: ColumnsType<T>;
  rowKey?: string | string | keyof T | GetRowKey<T>;
  data?: any;
  isLoading?: boolean;
  isError?: boolean;
  bordered?: boolean;
  error?: any;
  pageSize?: number;
  showExport?: boolean;
  exportFileName?: string;
  exportReportHead?: string;
  onBulkAction?: (rows: T[]) => void;
  showSearch?: boolean;
  showBulkAction?: boolean;
  showRowSelection?: boolean;
  headerBgToken?: string;
  showTotals?: boolean;
  totals?: Record<string, any>;
  totalsRowLabel?: React.ReactNode;
  totalsRowLabelColSpan?: number;
  customPagination?: {
    current: number;
    pageSize: number;
    pageSizeOptions?: string[];
    showSizeChanger?: boolean;
    onChange: (page: number, pageSize: number) => void;
  };
  pagination?: TablePaginationConfig | false;
  onPaginationChange?: (page: number, pageSize: number) => void;
  serverSidePagination?: boolean;
  bulkActionType?: string;
  bulkActionTitle?: string;
  scroll?: number;

  // 🔹 New props for controlled row selection
  selectedRowKeys?: React.Key[];
  onSelectionChange?: (keys: React.Key[], rows: T[]) => void;
  onSelectionRef?: (selection: {
    selectedRowKeys: React.Key[];
    selectedRows: T[];
    clearSelection: () => void;
    setSelection: (keys: React.Key[], rows: T[]) => void;
  }) => void;
  customElement?: React.ReactNode;
}



export const MasterTable = <T extends Record<string, any>>(
  props: MasterTableProps<T>
) => {
  const {
    title,
    data,
    isLoading,
    isError,
    error,
    columns,
    rowKey = "id",
    pageSize = 25,
    showExport = true,
    exportFileName = "Report",
    exportReportHead = "Report",
    onBulkAction,
    bulkActionType = "primary",
    bulkActionTitle = "Action",
    showSearch = true,
    showRowSelection = false,
    scroll = 800,
    showBulkAction = false,
    pagination: externalPagination,
    onPaginationChange,
    customPagination,
    serverSidePagination = false,
    selectedRowKeys: externalSelectedKeys,
    onSelectionChange,
    onSelectionRef,
    bordered = true,
    customElement,
    showTotals,
    totals,
    totalsRowLabel,
    totalsRowLabelColSpan
  } = props;

  const [internalSelectedKeys, setInternalSelectedKeys] = useState<React.Key[]>(
    []
  );
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>([]);
  const [exporting, setExporting] = useState(false);

  const selectedRowKeys = externalSelectedKeys ?? internalSelectedKeys;
  const selectedRows = internalSelectedRows;

  // Normalize data
  const dataArray: T[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data?.table && Array.isArray(data.table)) return data.table;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  }, [data]);

  const totalCount = useMemo(() => {
    if (!data) return 0;
    if (data?.totalCount !== undefined) return data.totalCount;
    if (data?.total !== undefined) return data.total;
    return dataArray.length;
  }, [data, dataArray]);

  const { searchText, handleSearch, filteredData } = useSearch(
    serverSidePagination ? [] : dataArray
  );

  const displayData = serverSidePagination ? dataArray : filteredData;

  //  Handle selection (works in both controlled & uncontrolled mode)
  const handleSelectionChange = (keys: React.Key[], rows: T[]) => {
    if (externalSelectedKeys === undefined) {
      setInternalSelectedKeys(keys);
      setInternalSelectedRows(rows);
    }
    onSelectionChange?.(keys, rows);
  };

  const clearSelection = () => {
    if (externalSelectedKeys === undefined) {
      setInternalSelectedKeys([]);
      setInternalSelectedRows([]);
    }
    onSelectionChange?.([], []);
  };

  const setSelection = (keys: React.Key[], rows: T[]) => {
    if (externalSelectedKeys === undefined) {
      setInternalSelectedKeys(keys);
      setInternalSelectedRows(rows);
    }
    onSelectionChange?.(keys, rows);
  };

  //  Expose selection ref to parent
  useEffect(() => {
    if (onSelectionRef) {
      onSelectionRef({
        selectedRowKeys,
        selectedRows,
        clearSelection,
        setSelection,
      });
    }
  }, [selectedRowKeys, selectedRows]);

  const rowSelection = showRowSelection
    ? {
      selectedRowKeys,
      onChange: handleSelectionChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
      ],
    }
    : undefined;

  // Export
  const handleExport = async () => {
    try {
      setExporting(true);
      await exportTableToExcel(
        columns as any,
        displayData as any,
        exportFileName,
        exportReportHead
      );
      message.success("Export ready");
    } catch (err) {
      console.error(err);
      message.error("Export failed");
    } finally {
      setExporting(false);
    }
  };

  const handleBulk = () => {
    if (!onBulkAction) {
      message.warning("No bulk action configured");
      return;
    }
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.warning("Please select at least one item");
      return;
    }
    onBulkAction(selectedRowKeys as any);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (onPaginationChange && pagination.current && pagination.pageSize) {
      onPaginationChange(pagination.current, pagination.pageSize);
      clearSelection();
    }
  };

  const paginationConfig = useMemo(() => {
    if (externalPagination === false) return false;

    if (serverSidePagination && externalPagination) {
      return {
        ...externalPagination,
        showSizeChanger: true,
        showTotal: (total: number, range: [number, number]) =>
          `${range[0]}-${range[1]} of ${total} items`,
      };
    }

    return {
      pageSize,
      showSizeChanger: true,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} of ${total} items`,
      total: totalCount,
    };
  }, [externalPagination, serverSidePagination, pageSize, totalCount]);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {title && <h3 className="text-lg font-semibold mr-4">{title}</h3>}
          {showExport && (
            <Button type="primary" className="font-medium bg-green-600 hover:bg-green-700! border-green-600" onClick={handleExport} loading={exporting} disabled={displayData.length === 0}>
              Export <RiFileExcel2Line size={18} />
            </Button>
          )}
          {showBulkAction && (
            <Button
              onClick={handleBulk}
              type={"primary"}
              danger={bulkActionType === "danger"}
              disabled={selectedRowKeys.length === 0}
            >
              {bulkActionTitle} ({selectedRowKeys?.length})
            </Button>
          )}
          {customElement && customElement}
        </div>

        {showSearch && !serverSidePagination && (
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search table data"
              value={searchText}
              onChange={handleSearch}
              prefix={<SearchOutlined />}
              allowClear
              className="w-64"
            />
          </div>
        )}
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : isError ? (
          <div className="flex flex-col justify-center items-center py-10">
            <MdWifiTetheringErrorRounded size={120} className="text-orange-100" />
            <p className="text-orange-200 text-xl font-semibold uppercase">
              {(error as any)?.message || "Failed to load data"}
            </p>
          </div>
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={formatColumns(columns, "--")}
            dataSource={displayData}
            rowKey={rowKey}
            pagination={customPagination ? customPagination : paginationConfig}
            onChange={handleTableChange}
            size="large"
            scroll={{ x: scroll }}
            bordered={bordered}
            className="custom-ant-table"
            rowClassName={() =>
              "transition duration-500 hover:shadow-sm "
            }
            summary={showTotals ? () => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell className="font-bold text-amber-500 text-lg" index={1} colSpan={totalsRowLabelColSpan || 1}>{totalsRowLabel || "Total"}</Table.Summary.Cell>
                <Table.Summary.Cell className="text-lg" index={2} align="center">{totals?.capitalWorks}</Table.Summary.Cell>
                <Table.Summary.Cell className="text-lg" index={3} align="center">{totals?.revenueWorks}</Table.Summary.Cell>
                <Table.Summary.Cell className="text-lg" index={4} align="center">{totals?.totalWorks}</Table.Summary.Cell>
                <Table.Summary.Cell className="text-lg" index={5} align="center">{moneyFormatter(totals?.capitalAmount || 0).inString}</Table.Summary.Cell>
                <Table.Summary.Cell className="text-md" index={6} align="center">{moneyFormatter(totals?.revenueAmount || 0).inString}</Table.Summary.Cell>
                <Table.Summary.Cell className="font-semibold text-amber-500 text-lg" index={7} align="center" >{moneyFormatter(totals?.totalAmount || 0).inString}</Table.Summary.Cell>
              </Table.Summary.Row>
            ) : undefined}
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{  ...(props.style || {}) }}
                    className={
                      "font-bold text-sm uppercase bg-primary-50! tracking-wide py-3 " +
                      (props.className || "")
                    }
                  >
                    {props.children}
                  </th>
                ),
              },
            }}
          />
        )}
      </div>
    </Card>
  );
};
export function formatColumns(columns: any, defaultValue = "N/A") {
  return columns.map((col: any) => {
    const existingRender = col.render;

    return {
      ...col,
      render: (value: any, record: any, index: any) => {
        if (existingRender) {
          const rendered = existingRender(value, record, index);
          return (rendered === undefined || rendered === null || rendered === "")
            ? defaultValue
            : rendered;
        }

        // No existing render → apply default value logic
        return (value === undefined || value === null || value === "")
          ? defaultValue
          : value;
      }
    };
  });
}
