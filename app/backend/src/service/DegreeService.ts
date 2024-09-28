export interface IDegree {
  // TODO pzareba: This shouldn't be here
  name: string;
  university: string;
  imageUrl: string;
}

export interface DegreeService {
  /**
   * @param query the query to be parsed by an external AI service
   * @returns An array of Degrees sorted descendingly, by how much they mach the query
   */

  getDegreesByQuery(query: string): Promise<IDegree[]>;
}

export class MockDegreeServiceImpl implements DegreeService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDegreesByQuery(query: string): Promise<IDegree[]> {
    return Promise.resolve([
      {
        name: "Informatyka",
        university: "Akademia Górniczo Hutnicza",
        imageUrl: "https://www.google.com/imgres?q=goatse&imgurl=https%3A%2F%2Fpreview.redd.it%2Fr2p4k92x2ah71.png%3Fwidth%3D680%26format%3Dpng%26auto%3Dwebp%26s%3D63d3cd99a011cb77cb9e8cf4b15f23d21c653488&imgrefurl=https%3A%2F%2Fwww.reddit.com%2Fr%2Fquake%2Fcomments%2Fp43q20%2Fgoatse_map_name_please%2F&docid=JCHNfYZiliL4HM&tbnid=pE1cwPl81H_UjM&w=680&h=510&hcb=2",
      },
      {
        name: "Prawo",
        university: "Uniwersytet Jagielloński",
        imageUrl: "https://www.google.com/imgres?q=goatse&imgurl=https%3A%2F%2Fpreview.redd.it%2Fr2p4k92x2ah71.png%3Fwidth%3D680%26format%3Dpng%26auto%3Dwebp%26s%3D63d3cd99a011cb77cb9e8cf4b15f23d21c653488&imgrefurl=https%3A%2F%2Fwww.reddit.com%2Fr%2Fquake%2Fcomments%2Fp43q20%2Fgoatse_map_name_please%2F&docid=JCHNfYZiliL4HM&tbnid=pE1cwPl81H_UjM&w=680&h=510&hcb=2",
      },
      {
        name: "Informatyka Techniczna",
        university: "Akademia Górniczo Hutnicza",
        imageUrl: "https://www.google.com/imgres?q=goatse&imgurl=https%3A%2F%2Fpreview.redd.it%2Fr2p4k92x2ah71.png%3Fwidth%3D680%26format%3Dpng%26auto%3Dwebp%26s%3D63d3cd99a011cb77cb9e8cf4b15f23d21c653488&imgrefurl=https%3A%2F%2Fwww.reddit.com%2Fr%2Fquake%2Fcomments%2Fp43q20%2Fgoatse_map_name_please%2F&docid=JCHNfYZiliL4HM&tbnid=pE1cwPl81H_UjM&w=680&h=510&hcb=2",
      },
      {
        name: "Botanika",
        university: "Uniwersytet Rolniczy w Krakowie",
        imageUrl: "https://www.google.com/imgres?q=goatse&imgurl=https%3A%2F%2Fpreview.redd.it%2Fr2p4k92x2ah71.png%3Fwidth%3D680%26format%3Dpng%26auto%3Dwebp%26s%3D63d3cd99a011cb77cb9e8cf4b15f23d21c653488&imgrefurl=https%3A%2F%2Fwww.reddit.com%2Fr%2Fquake%2Fcomments%2Fp43q20%2Fgoatse_map_name_please%2F&docid=JCHNfYZiliL4HM&tbnid=pE1cwPl81H_UjM&w=680&h=510&hcb=2",
      },
    ]);
  }
}
