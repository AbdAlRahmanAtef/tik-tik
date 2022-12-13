import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import comment from "./comment";
import post from "./post";
import postedBy from "./postedBy";
import user from "./user";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([comment, post, postedBy, user]),
});
