import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import type { ConceptFull, ConceptMeta, GraphData } from "./types";

export async function scanLibrary(): Promise<ConceptMeta[]> {
  return invoke<ConceptMeta[]>("scan_library");
}

export async function readConcept(id: string): Promise<ConceptFull> {
  return invoke<ConceptFull>("read_concept", { id });
}

export async function getGraphData(): Promise<GraphData> {
  return invoke<GraphData>("get_graph_data");
}

export async function openFolderDialog(): Promise<string | null> {
  const selected = await open({
    directory: true,
    multiple: false,
    title: "Open Library Folder",
  });

  if (typeof selected === "string") {
    return invoke<string>("open_folder", { path: selected });
  }
  return null;
}

export async function getCurrentLibraryPath(): Promise<string | null> {
  return invoke<string | null>("get_current_library_path");
}

export async function saveConcept(filePath: string, content: string): Promise<void> {
  return invoke<void>("save_concept", { filePath, content });
}
