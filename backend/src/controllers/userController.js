import User from "../models/User.js";

export const uploadGovtId = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File not provided" });
  }

  req.user.govtIdFile = `/uploads/govt-ids/${req.file.filename}`;
  await req.user.save();

  res.json({ message: "Govt ID uploaded successfully" });
};
