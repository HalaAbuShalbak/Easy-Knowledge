const roleModel = require("../models/roleSchema");
// create
const createRole = (req, res) => {
  const { role, permissions,siteRole } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
    siteRole
  });
  newRole
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Role created Successfully",
        role: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
// delete
const deleteRole = (req, res) => {
  const id = req.params.id;
  roleModel
    .findByIdAndDelete(id)
    .then((roleId) => {
      if (roleId) {
        res.status(200).json({
          success: true,
          message: "role deleted",
          role: roleId,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: "role not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
module.exports = { createRole, deleteRole };
