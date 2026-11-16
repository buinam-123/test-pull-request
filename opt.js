
const otpStorage = {};

// ================================
// 1. CẤU HÌNH
// ================================
const OTP_EXPIRATION = 60 * 1000; // 60 giây
const MAX_ATTEMPTS = 5;

// ================================
// 2. TẠO OTP
// ================================
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ================================
// 3. GỬI OTP
// ================================
function sendOTP(email) {

    if (!email || !email.includes("@")) {
        console.log("Email không hợp lệ!");
        return;
    }

    // Tạo OTP mới
    const otp = generateOTP();

    // Lưu OTP (ghi đè OTP cũ nếu có)
    otpStorage[email] = {
        code: otp,
        expiresAt: Date.now() + OTP_EXPIRATION,
        attempts: 0
    };

    console.log(`Đang gửi OTP đến ${email}...`);

    // Mô phỏng gửi email sau 1 giây
    setTimeout(() => {
        console.log("--------------------------------");
        console.log(`Email nhận: ${email}`);
        console.log(`OTP: ${otp}`);
        console.log("Thời hạn: 60 giây");
        console.log("--------------------------------");
    }, 1000);
}

// ================================
// 4. XÁC THỰC OTP
// ================================
function verifyOTP(email, inputOTP) {

    const data = otpStorage[email];

    // Kiểm tra OTP tồn tại
    if (!data) {
        console.log("Bạn chưa yêu cầu gửi OTP!");
        return false;
    }

    // Kiểm tra thời hạn
    if (Date.now() >= data.expiresAt) {
        delete otpStorage[email];
        console.log("OTP đã hết hạn!");
        return false;
    }

    // Kiểm tra số lần nhập sai
    if (data.attempts >= MAX_ATTEMPTS) {
        delete otpStorage[email];
        console.log("Bạn đã nhập sai quá số lần cho phép!");
        return false;
    }

    // Kiểm tra OTP
    if (data.code !== String(inputOTP)) {
        data.attempts++;

        console.log("OTP không chính xác!");
        console.log(`Số lần nhập sai: ${data.attempts}/${MAX_ATTEMPTS}`);

        if (data.attempts >= MAX_ATTEMPTS) {
            delete otpStorage[email];
            console.log("OTP đã bị vô hiệu hóa!");
        }

        return false;
    }

    // Xác thực thành công
    delete otpStorage[email];

    console.log("Xác thực OTP thành công!");

    return true;
}

// ================================
// 5. DEMO
// ================================

const email = "user@gmail.com";

// Gửi OTP
sendOTP(email);

// Giả lập người dùng nhập OTP sau 2 giây
setTimeout(() => {

    const otp = otpStorage[email].code;

    console.log("\nNgười dùng đang nhập OTP:", otp);

    verifyOTP(email, otp);

}, 2000);
