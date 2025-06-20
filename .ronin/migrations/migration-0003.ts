import { create } from "ronin";

export default () => [
  create.model({
    slug: "link",
    fields: {
      url: { required: true, type: "string" },
      title: { required: true, type: "string" },
      user: { required: true, target: "user", type: "link" },
    },
  }),
];
