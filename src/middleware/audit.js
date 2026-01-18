const AuditLog = require("../models/AuditLog");

module.exports = function (actionName) {
  return async function (req, res, next) {
    try {
      if (req.user) {
        await AuditLog.create({
          userId: req.user.userId,
          role: req.user.role,
          action: actionName
        });
      }
    } catch (err) {
      console.error("Audit log error:", err);
    }
    next();
  };
};
