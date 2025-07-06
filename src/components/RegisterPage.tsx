import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const SHEET_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL;
console.log("Google Sheet Script URL:", SHEET_SCRIPT_URL);

function RegisterPage() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const type = searchParams.get("type");
    const instructor = searchParams.get("instructor");
    const day = searchParams.get("day");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const classInfo = `${type} with ${instructor} on ${day} from ${start} to ${end}`;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            HoTen: formData.get("HoTen"),
            SoDienThoai: formData.get("SoDienThoai"),
            Email: formData.get("Email"),
            ClassInfo: classInfo,
        };

        console.log("Submitting registration data:", data);

        try {
            const response = await fetch(SHEET_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Required for Apps Script
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            console.log("Response from Google Sheet Script:", response);
            setStatus("success");
            //   e.currentTarget.reset();
        } catch (error) {
            console.error("Error submitting form", error);
            setStatus("error");
    }};

    return (
        <div className="container-fluid">
            <div className="flex flex-col justify-center p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Register for Class</h2>
                <a className="inline-block mt-4 px-5 py-2 bg-white text-black rounded-full hover:bg-blue-600 transition"
                    href="https://homepolenfitness.shop/"
                > Home Page </a>
                <div className="space-y-2 text-sm mb-4">
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Instructor:</strong> {instructor}</p>
                    <p><strong>Day:</strong> {day}</p>
                    <p><strong>Time:</strong> {start} - {end}</p>
                </div>
                <form className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4" 
                    onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="HoTen">Họ và Tên (Name):</label>
                    <input type="text" id="HoTen" name="HoTen" className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="SoDienThoai">Số điện thoại (Phone Number):</label>
                    <input type="text" id="SoDienThoai" name="SoDienThoai" className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="Email">Email:</label>
                    <input type="email" id="Email" name="Email" className="w-full p-2 border rounded" required />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Register
                </button>
            </form>
            {status === "success" && (
            <p className="mt-4 text-green-600 text-sm font-medium">
                ✅ Registration successful! We'll contact you soon.
            </p>
            )}
            {status === "error" && (
            <p className="mt-4 text-red-600 text-sm font-medium">
                ❌ Something went wrong. Please try again.
            </p>
            )}
            </div>
        </div>
    );
}

export default RegisterPage;
