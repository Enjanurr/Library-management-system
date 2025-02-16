import mongoose, { Schema, Document } from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const connection_string = process.env.DATABASE_URI || "Failed to connect";

// ===============================
// 📌 User Schema (Students & Librarians)
// ===============================
interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  role: "student" | "librarian";
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "librarian"], default: "student" },
});

// ===============================
// 📌 Book Schema (Tracks Copies)
// ===============================
interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  available:boolean;
  createdAt:Date;
  upatedAt:Date;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true }, // ✅ Ensure availability status
}, { timestamps: true });


// ===============================
// 📌 Study Schema (Tracks Book Availability)
// ===============================
interface IStudy extends Document {
  book: mongoose.Schema.Types.ObjectId;
  status: "available" | "borrowed";
  totalBorrowers: number;
}

const studySchema = new Schema<IStudy>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    default: "available",
  },
  totalBorrowers: { type: Number, default: 0 }, // Tracks students who borrowed this book
});

// ===============================
// 📌 Transaction Schema (Borrow & Return Logs)
// ===============================
interface ITransaction extends Document {
  transactionId: string;
  student: mongoose.Schema.Types.ObjectId;
  book: mongoose.Schema.Types.ObjectId;
  borrowDate: Date;
  returnDate?: Date;
  status: "borrowed" | "returned";
}

const transactionSchema = new Schema<ITransaction>({
  transactionId: { type: String, unique: true },
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, enum: ["borrowed", "returned"], default: "borrowed" },
});

// Automatically generate transactionId before saving
transactionSchema.pre("save", function (next) {
  if (!this.transactionId) {
    this.transactionId = `TXN-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;
  }
  next();
});

// ===============================
// 📌 Export Models
// ===============================
export const User = mongoose.model<IUser>("User", userSchema);
export const Book = mongoose.model<IBook>("Book", bookSchema);
export const Study = mongoose.model<IStudy>("Study", studySchema);
export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

// ===============================
// 📌 Database Connection Function
// ===============================
export const connectDb = async () => {
  try {
    await mongoose.connect(connection_string);
    console.log("✅ Database Successfully Connected");
  } catch (error) {
    console.log("❌ Database Connection Failed", error);
    process.exit(1);
  }
};
