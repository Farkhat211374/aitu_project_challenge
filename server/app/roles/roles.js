const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("Basic")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("Moderator")
 .extend("Basic")
 .readAny("profile")
 
ac.grant("Admin")
 .extend("Basic")
 .extend("Moderator")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();