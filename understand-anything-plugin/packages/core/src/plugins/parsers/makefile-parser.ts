import type { AnalyzerPlugin, StructuralAnalysis, StepInfo } from "../../types.js";

export class MakefileParser implements AnalyzerPlugin {
  name = "makefile-parser";
  languages = ["makefile"];

  analyzeFile(_filePath: string, content: string): StructuralAnalysis {
    const steps = this.extractTargets(content);
    return {
      functions: [],
      classes: [],
      imports: [],
      exports: [],
      steps,
    };
  }

  private extractTargets(content: string): StepInfo[] {
    const targets: StepInfo[] = [];
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      // Match target: dependencies (not variable assignments or comments)
      const match = lines[i].match(/^([a-zA-Z_][\w.-]*)(?:\s+.*)?:/);
      if (match && !lines[i].includes(":=") && !lines[i].includes("?=")) {
        // Find end of target (next non-indented non-empty line or EOF)
        let endLine = i + 1;
        while (endLine < lines.length) {
          const nextLine = lines[endLine];
          if (nextLine === "" || nextLine.startsWith("\t") || nextLine.startsWith("  ")) {
            endLine++;
          } else {
            break;
          }
        }
        targets.push({
          name: match[1],
          lineRange: [i + 1, endLine],
        });
      }
    }
    return targets;
  }
}
