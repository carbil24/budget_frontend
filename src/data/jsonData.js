export class jsonData {
  constructor() {
    this.users = [
      {
        id: 1,
        first_name: "Daniela",
        last_name: "Rodriguez",
        email: "daniroca@hotmail.com",
        password: "12345678",
      },
      {
        id: 2,
        first_name: "Carlos",
        last_name: "Bilbao",
        email: "carbil@hotmail.com",
        password: "12345678",
      },
    ];

    this.members = [
      {
        id: 1,
        email: "daniroca@hotmail.com",
        name: "Daniela Rodriguez",
        created_at: "06/19/2020",
      },
      {
        id: 2,
        email: "carbil@hotmail.com",
        name: "Carlos Bilbao",
        created_at: "07/21/2020",
      },
      {
        id: 3,
        email: "pedro@gmail.com",
        name: "No name",
        created_at: "08/24/2020",
      },
    ];

    this.groups = [
      {
        id: 1,
        name: "Family group",
        members: 3,
        created_by: "daniroca@hotmail.com",
        rules_set: false,
        created_at: "10/09/2020",
      },
      {
        id: 2,
        name: "Other Group",
        members: 2,
        created_by: "carbil@hotmail.com",
        rules_set: true,
        created_at: "10/20/2020",
      },
      {
        id: 3,
        name: "Another Group",
        members: 1,
        created_by: "carbil@hotmail.com",
        rules_set: true,
        created_at: "10/25/2020",
      },
      {
        id: 4,
        name: "Fourth Group",
        members: 1,
        created_by: "carbil@hotmail.com",
        rules_set: false,
        created_at: "10/28/2020",
      },
    ];

    this.rules = [
      {
        id: 1,
        description: "Cada miembro aportara el mismo porcentaje",
      },
      { id: 2, description: "Cada miembro aportara un porcentaje acordado" },
      {
        id: 3,
        description:
          "Cada miembro aportara de acuerdo a sus ingresos individuales",
      },
      {
        id: 4,
        description:
          "El aporte se hara en base a los ingresos individuales, descontando todos los gastos personales",
      },
      {
        id: 5,
        description:
          "El aporte se hara en base a los ingresos individuales, descontando solo los gastos basicos personales",
      },
      {
        id: 6,
        description:
          "Compartir los ingresos individuales de cada miembro con el grupo",
      },
      {
        id: 7,
        description:
          "Compartir los gastos basicos personales de cada miembro con el grupo",
      },
      {
        id: 8,
        description:
          "Compartir los gastos no basicos personales de cada miembro con el grupo",
      },
    ];

    this.group_member = [
      { group_id: 1, member_id: 1, joined: true, rules_accepted: false },
      { group_id: 1, member_id: 2, joined: false, rules_accepted: false },
      { group_id: 1, member_id: 3, joined: false, rules_accepted: false },
      { group_id: 2, member_id: 2, joined: true, rules_accepted: false },
      { group_id: 2, member_id: 1, joined: true, rules_accepted: true },
      { group_id: 3, member_id: 2, joined: true, rules_accepted: true },
      { group_id: 4, member_id: 2, joined: true, rules_accepted: false },
    ];

    this.group_rule = [
      { group_id: 2, rule_id: 3 },
      { group_id: 2, rule_id: 4 },
      { group_id: 2, rule_id: 7 },
      { group_id: 2, rule_id: 8 },
      { group_id: 3, rule_id: 1 },
    ];
  }
}
