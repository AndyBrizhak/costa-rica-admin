import React, { useRef } from "react";
import { Button, useNotify, useRefresh } from "react-admin";
import { Upload } from "lucide-react";
import { httpClient } from "../auth/httpClient";
// Импорт типа для соответствия verbatimModuleSyntax
import type { BulkImportResponseDto } from "./googleCategoryTypes";

/**
 * Кнопка для массового импорта Google категорий из JSON файла.
 * Исправлена для соответствия правилам ESLint (no-explicit-any).
 */
export const GoogleCategoryImportButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notify = useNotify();
  const refresh = useRefresh();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const json = JSON.parse(content);

        const response = await httpClient(
          `${apiUrl}/api/google-categories/bulk`,
          {
            method: "POST",
            body: JSON.stringify(json),
          },
        );

        const result = response.json as BulkImportResponseDto;

        if (result.hasConflict) {
          notify(result.errorMessage || "Import conflict detected", {
            type: "error",
          });
        } else {
          notify(`Successfully imported ${result.importedCount} categories`, {
            type: "success",
          });
          refresh();
        }
      } catch (error: unknown) {
        // Безопасное извлечение сообщения об ошибке без использования 'any'
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        notify(`Import failed: ${errorMessage}`, { type: "error" });
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".json"
        onChange={handleFileChange}
      />
      <Button label="Import JSON" onClick={handleButtonClick}>
        <Upload size={18} style={{ marginRight: "8px" }} />
      </Button>
    </>
  );
};
