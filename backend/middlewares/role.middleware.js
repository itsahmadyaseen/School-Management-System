const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      console.log("Access denied : Does not have access for this");
      return res.status(403).json({
        message: "Access Denied : Does not have access for this",
      });
    }
    next();
  };
};
