import { PrismaClient, Major } from "@prisma/client";
import { IMajor } from "@common/interfaces/IMajor.js";
import fetch from "node-fetch";
import { MockMajorServiceImpl } from "../MajorService.js";

export interface AiService {
  /**
   * @param prompt - The prompt entered by the user to be tokenized
   * @returns an array of ids of items that match the prompt the closest
   */
  getIdsByPrompt(prompt: String): Promise<IMajor[]>;

  getIdsById(id: number): Promise<IMajor[]>;
}

export class AiServiceImpl implements AiService {
  prismaClient: PrismaClient;
  serviceAddr: string;
  constructor(prismaClient: PrismaClient, serviceAddr: string) {
    this.prismaClient = prismaClient;
    this.serviceAddr = serviceAddr;
  }
  getIdsById(id: number, amount: number = 5): Promise<IMajor[]> {
    return fetch(this.serviceAddr + "/knn", {
      method: "POST",
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        major_id: id,
        top_k: amount,
      }),
    })
      .then((res) => res.json() as Promise<number[]>)
      .then((ids) =>
        this.prismaClient.major.findMany({
          where: {
            id: { in: ids },
          },
          include: {
            university: true,
          }
        }),
      )
      .then((data) =>
        data.map((entry) => MockMajorServiceImpl.mapMajorToDTO(entry)),
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getIdsByPrompt(prompt: String, amount: number = 5): Promise<IMajor[]> {
    
    return fetch(this.serviceAddr + "/query", {
      method: "POST",
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        "query": prompt,
        "top_k": amount,
      }),
    })
      .then((res) => {
        console.log(res)
        return res.json() as Promise<{ top_k: number[]}>
      })
      .then((ids) =>
        this.prismaClient.major.findMany({
          where: {
            id: { in: ids.top_k },
          },
          include: {
            university: true,
          }
        }),
      )
      .then((data) =>
        data.map((entry) => MockMajorServiceImpl.mapMajorToDTO(entry)),
      );
  }
}
