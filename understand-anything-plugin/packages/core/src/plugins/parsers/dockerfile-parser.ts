import type { AnalyzerPlugin, StructuralAnalysis, ServiceInfo, StepInfo } from "../../types.js";

export class DockerfileParser implements AnalyzerPlugin {
  name = "dockerfile-parser";
  languages = ["dockerfile"];

  analyzeFile(_filePath: string, content: string): StructuralAnalysis {
    const services = this.extractStages(content);
    const steps = this.extractSteps(content);
    return {
      functions: [],
      classes: [],
      imports: [],
      exports: [],
      services,
      steps,
    };
  }

  private extractStages(content: string): ServiceInfo[] {
    const stages: ServiceInfo[] = [];
    const lines = content.split("\n");
    const ports: number[] = [];

    // Collect all EXPOSE ports
    for (const line of lines) {
      const exposeMatch = line.match(/^EXPOSE\s+(.+)/i);
      if (exposeMatch) {
        const portValues = exposeMatch[1].split(/\s+/);
        for (const p of portValues) {
          const num = parseInt(p, 10);
          if (!isNaN(num)) ports.push(num);
        }
      }
    }

    // Extract FROM stages
    for (const line of lines) {
      const fromMatch = line.match(/^FROM\s+(\S+)(?:\s+[Aa][Ss]\s+(\S+))?/i);
      if (fromMatch) {
        const image = fromMatch[1];
        const name = fromMatch[2] ?? image.split(":")[0].split("/").pop() ?? image;
        stages.push({
          name,
          image,
          ports: stages.length === 0 ? ports : [], // Assign ports to first stage only as default
        });
      }
    }

    return stages;
  }

  private extractSteps(content: string): StepInfo[] {
    const steps: StepInfo[] = [];
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const match = lines[i].match(/^(FROM|RUN|COPY|ADD|WORKDIR|CMD|ENTRYPOINT|ENV|ARG|EXPOSE|VOLUME|USER|HEALTHCHECK)\s/i);
      if (match) {
        steps.push({
          name: `${match[1].toUpperCase()} ${lines[i].slice(match[1].length + 1).trim().slice(0, 60)}`,
          lineRange: [i + 1, i + 1],
        });
      }
    }
    return steps;
  }
}
