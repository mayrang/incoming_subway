export const stationList:{id: string; name: string;}[]= [
    {
      id: "101",
      name: "판암\n(대전대)",
    },
    {
      id: "102",
      name: "신흥",
    },
    {
      id: "103",
      name: "대동\n(우송대)",
    },
    {
      id: "104",
      name: "대전역",
    },
    {
      id: "105",
      name: "중앙로",
    },
    {
      id: "106",
      name: "중구청",
    },
    {
      id: "107",
      name: "서대전네거리",
    },
    {
      id: "108",
      name: "오룡",
    },
    {
      id: "109",
      name: "용문",
    },
    {
      id: "110",
      name: "탄방",
    },
    {
      id: "111",
      name: "시청",
    },
    {
      id: "112",
      name: "정부청사",
    },
    {
      id: "113",
      name: "갈마",
    },
    {
      id: "114",
      name: "월평\n(한국과학기술원)",
    },
    {
      id: "115",
      name: "갑천",
    },
    {
      id: "116",
      name: "유성온천\n(충남대, 목원대)",
    },
    {
      id: "117",
      name: "구암",
    },
    {
      id: "118",
      name: "현충원\n(한밭대)",
    },
    {
      id: "119",
      name: "월드컵경기장\n(노은도매시장)",
    },
    {
      id: "120",
      name: "노은",
    },
    {
      id: "121",
      name: "지족\n(침신대)",
    },
    {
      id: "122",
      name: "반석\n(칠성대)",
    },
];

export const stationPaths = () => {
  return stationList.map((it) =>{ return {params: {id: it.id} }});
}