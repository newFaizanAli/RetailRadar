import { useCallback } from "react";
import jsPDF from "jspdf";
import {
  generateDemandDetailsPDF,
  generateDemandInvoicePDF,
  generateIssueDetailsPDF,
  generateIssueInvoicePDF,
  generateIssueReturnPDF,
  generateIssueSummaryPDF,
  generateItemDetailsPDF,
  generatePurchaseDetailPDF,
  generatePurchaseInvoicePDF,
  generatePurchaseOrderDetailPDF,
  generatePurchaseOrderSummaryPDF,
  generatePurchaseSummaryPDF,
  generateReceivingDetailsPDF,
} from "../pdf";

const useGeneratePDF = () => {
  const generatePDF = useCallback((data, reportType) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("courier", "normal");
    doc.setFontSize(16);
    doc.text("DGK Utility Store", 105, 15, { align: "center" });

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(7);
    doc.setFont("courier", "normal");
    doc.text(`${currentDate}`, 105, 20, { align: "center" });

    switch (reportType) {
      case "purchaseDetail":
        generatePurchaseDetailPDF(doc, data);
        break;
      case "purchaseorderDetail":
        generatePurchaseOrderDetailPDF(doc, data);
        break;
      case "purchaseOrderSummary":
        generatePurchaseOrderSummaryPDF(doc, data);
        break;
      case "purchaseInvoice":
        generatePurchaseInvoicePDF(doc, data);
        break;
      case "purchaseSummary":
        generatePurchaseSummaryPDF(doc, data);
        break;
      case "issuereturnDetails":
        generateIssueReturnPDF(doc, data);
        break
      case "issueDetails":
        generateIssueDetailsPDF(doc, data);
        break
      case 'issueInvoice':
        generateIssueInvoicePDF(doc, data)
        break
      case 'issueSummary':
        generateIssueSummaryPDF(doc, data)
      break
      case 'receivingDetails':
        generateReceivingDetailsPDF(doc, data)
      break
      case 'demandDetails':
        generateDemandDetailsPDF(doc, data)
      break
      case 'demandInvoice':
        generateDemandInvoicePDF(doc, data)
      break
      case 'itemsDetails':
        generateItemDetailsPDF(doc, data)
      break
      default:
        console.log("Unknown report type");
    }

    const footerY = 285;
    doc.setFontSize(7);
    doc.setFont("courier", "normal");
    doc.text("Powered by DGK POS System", 105, footerY, { align: "center" });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  }, []);

  return { generatePDF };
};

export default useGeneratePDF;
