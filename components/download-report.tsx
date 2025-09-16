"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadReportProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

export const DownloadReport: React.FC<DownloadReportProps> = ({ targetRef, fileName }) => {
  const handleDownload = () => {
    if (targetRef.current) {
      html2canvas(targetRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#030303",
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileName}.pdf`);
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="border-white/30 text-white hover:bg-white/10"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4 mr-2" />
      Download Report
    </Button>
  );
};
