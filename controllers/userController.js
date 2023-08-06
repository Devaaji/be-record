import bcrypt from "bcrypt";
import Users from "../models/users.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { full_name, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const existingEmail = await Users.findOne({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return res.status(404).json({
        status: 404,
        message: "Email Sudah Terdaftar",
      });
    }

    await Users.create({
      full_name,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      status: 200,
      message: "Pendaftaran Berhasil",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "email atau password salah",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(404).json({
        status: 404,
        message: "email atau password salah",
      });
    }
    const createToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ email: user.email, createToken });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Terjadi Kesalahan Pada Server",
    });
  }
};
