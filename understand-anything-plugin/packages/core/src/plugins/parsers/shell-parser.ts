import type { AnalyzerPlugin, StructuralAnalysis, ReferenceResolution } from "../../types.js";

export class ShellParser implements AnalyzerPlugin {
  name = "shell-parser";
  languages = ["shell"];

  analyzeFile(_filePath: string, content: string): StructuralAnalysis {
    const functions = this.extractFunctions(content);
    return {
      functions,
      classes: [],
      imports: [],
      exports: [],
    };
  }

  extractReferences(filePath: string, content: string): ReferenceResolution[] {
    const refs: ReferenceResolution[] = [];
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      // Match source/. commands
      const sourceMatch = lines[i].match(/^\s*(?:source|\.)[ \t]+["']?([^"'\s]+)["']?/);
      if (sourceMatch) {
        refs.push({
          source: filePath,
          target: sourceMatch[1],
          referenceType: "file",
          line: i + 1,
        });
      }
    }
    return refs;
  }

  private extractFunctions(content: string): Array<{ name: string; lineRange: [number, number]; params: string[] }> {
    const functions: Array<{ name: string; lineRange: [number, number]; params: string[] }> = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      // Match function name() { or function name {
      const match = lines[i].match(/^(?:function\s+)?(\w+)\s*\(\s*\)\s*\{?/) ||
                    lines[i].match(/^function\s+(\w+)\s*\{?/);
      if (match) {
        const name = match[1];
        // Find closing brace
        let endLine = i;
        if (lines[i].includes("{")) {
          let depth = 0;
          for (let j = i; j < lines.length; j++) {
            for (const ch of lines[j]) {
              if (ch === "{") depth++;
              if (ch === "}") depth--;
            }
            if (depth === 0) {
              endLine = j;
              break;
            }
          }
        }
        functions.push({
          name,
          lineRange: [i + 1, endLine + 1],
          params: [],
        });
      }
    }

    return functions;
  }
}
