
// Lưu OTP tạm thời
let otpStorage = {};

// Hàm tạo OTP ngẫu nhiên gồm 6 chữ số
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Hàm gửi OTP
function sendOTP(email) {
    const otp = generateOTP();

    // Lưu OTP cùng thời điểm hết hạn
    otpStorage[email] = {
        code: otp,
        expiresAt: Date.now() + 60 * 1000
    };

    // Mô phỏng gửi email
    console.log(`Đang gửi OTP đến ${email}...`);

    setTimeout(() => {
        console.log(`Email: ${email}`);
        console.log(`Mã OTP của bạn là: ${otp}`);
        console.log("OTP có hiệu lực trong 60 giây.");
    }, 1000);
}

// Hàm xác thực OTP
function verifyOTP(email, inputOTP) {
    const data = otpStorage[email];

    if (!data) {
        console.log("Bạn chưa yêu cầu gửi OTP!");
        return false;
    }

    if (Date.now() > data.expiresAt) {
        console.log("OTP đã hết hạn!");
        delete otpStorage[email];
        return false;
    }

    if (data.code !== inputOTP) {
        console.log("OTP không chính xác!");
        return false;
    }

    console.log("Xác thực OTP thành công!");

    // Xóa OTP sau khi sử dụng
    delete otpStorage[email];

    return true;
}

// ===========================
// DEMO
// ===========================

const email = "user@gmail.com";

// Gửi OTP
sendOTP(email);

// Giả lập người dùng nhập OTP sau 2 giây
setTimeout(() => {
    const otp = otpStorage[email].code;

    verifyOTP(email, otp);
}, 2000);
