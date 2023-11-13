/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('disney').del()
  await knex('disney').insert([
    {
      id: 112,
      name: "Achilles",
      imageUrl: "https://static.wikia.nocookie.net/disney/images/d/d3/Vlcsnap-2015-05-06-23h04m15s601.png",
      createdAt: "2021-04-12T01:31:30.547Z",
      updatedAt: "2021-12-20T20:39:18.033Z"
    },
    {
      id: 4703,
      name: "Mickey Mouse",
      imageUrl: "https://static.wikia.nocookie.net/disney/images/9/99/Mickey_Mouse_Disney_3.jpeg",
      createdAt: "2021-04-12T02:33:01.829Z",
      updatedAt: "2021-12-20T20:40:04.583Z"
    },
  ]);
};
