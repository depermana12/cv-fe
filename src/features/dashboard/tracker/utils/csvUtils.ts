import Papa from "papaparse";
import { JobTrackerImport } from "../types/jobTracker.type";

/**
 * Maps a job tracker record to a CSV-friendly format with readable column names
 */
const formatJobDataForExport = (record: JobTrackerImport) => ({
  id: record.id || "",
  "Job Title": record.jobTitle || "",
  "Company Name": record.companyName || "",
  "Job Type": record.jobType || "",
  "Position Level": record.position || "",
  Location: record.location || "",
  "Location Type": record.locationType || "",
  Status: record.status || "",
  "Applied Date": record.appliedAt
    ? new Date(record.appliedAt).toLocaleDateString()
    : "",
  "Job Portal": record.jobPortal || "",
  "Job URL": record.jobUrl || "",
  Notes: record.notes || "",
  "Created At": record.createdAt
    ? new Date(record.createdAt).toLocaleDateString()
    : "",
  "Updated At": record.updatedAt
    ? new Date(record.updatedAt).toLocaleDateString()
    : "",
});

/**
 * Generate a formatted filename with date stamp
 */
const generateFilename = (baseName: string): string => {
  const datePart = new Date().toISOString().split("T")[0];
  return `${baseName}-${datePart}.csv`;
};

/**
 * Trigger download of a CSV blob
 */
const downloadCsv = (csvBlob: Blob, filename: string): void => {
  const url = URL.createObjectURL(csvBlob);
  const link = document.createElement("a");

  if (link.download !== undefined) {
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object after download
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } else {
    console.error("Browser doesn't support download attribute");
  }
};

/**
 * Core export function that converts data to CSV and triggers download
 */
export const exportToCSV = (
  data: JobTrackerImport[],
  filename: string = "job-applications",
): boolean => {
  if (data.length === 0) {
    alert("No data to export");
    return false;
  }

  try {
    const formattedData = data.map(formatJobDataForExport);
    const csv = Papa.unparse(formattedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    downloadCsv(blob, generateFilename(filename));
    return true;
  } catch (error) {
    console.error("Error exporting to CSV:", error);
    alert("Failed to export data. Please try again.");
    return false;
  }
};

/**
 * Export filtered data with appropriate filename
 */
export const exportFilteredToCSV = (
  allData: JobTrackerImport[],
  filteredData: JobTrackerImport[],
  filename: string = "job-applications",
): boolean => {
  if (filteredData.length === 0) {
    alert("No data to export");
    return false;
  }

  const exportFilename =
    filteredData.length === allData.length ? filename : `${filename}-filtered`;

  return exportToCSV(filteredData, exportFilename);
};

/**
 * Export selected items to CSV
 */
export const exportSelectedToCSV = (
  selectedData: JobTrackerImport[],
  filename: string = "job-applications",
): boolean => {
  if (selectedData.length === 0) {
    alert("No items selected to export");
    return false;
  }

  return exportToCSV(selectedData, `${filename}-selected`);
};
