
// ================================
// 1. DATABASE GIẢ LẬP
// ================================
const users = [
    {
        id: 1,
        username: "admin",
        password: "123456",
        role: "ADMIN"
    },
    {
        id: 2,
        username: "nam",
        password: "nam123",
        role: "USER"
    }
];

// ================================
// 2. HÀM GIẢ LẬP API LOGIN
// ================================
function login(username, password) {
    return new Promise((resolve, reject) => {

        console.log("Đang gửi yêu cầu đăng nhập...");

        // Giả lập thời gian phản hồi của server (1 giây)
        setTimeout(() => {

            // Kiểm tra dữ liệu đầu vào
            if (!username || !password) {
                reject({
                    status: 400,
                    message: "Vui lòng nhập đầy đủ thông tin!"
                });
                return;
            }

            // Tìm tài khoản trong database giả lập
            const user = users.find(
                u => u.username === username
            );

            // Kiểm tra tài khoản
            if (!user) {
                reject({
                    status: 404,
                    message: "Tài khoản không tồn tại!"
                });
                return;
            }

            // Kiểm tra mật khẩu
            if (user.password !== password) {
                reject({
                    status: 401,
                    message: "Mật khẩu không chính xác!"
                });
                return;
            }

            // Đăng nhập thành công
            resolve({
                status: 200,
                message: "Đăng nhập thành công!",
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                token: "fake-jwt-token-" + Date.now()
            });

        }, 1000);
    });
}

// ================================
// 3. HÀM XỬ LÝ ĐĂNG NHẬP
// ================================
async function handleLogin() {
    const username = "nam";
    const password = "nam123";

    try {
        const response = await login(username, password);

        console.log(response.message);
        console.log("User:", response.data);
        console.log("Token:", response.token);

        // Giả lập lưu token
        localStorage.setItem("accessToken", response.token);

    } catch (error) {
        console.error("Đăng nhập thất bại:", error.message);
    }
}

// ================================
// 4. THỰC THI
// ================================
handleLogin();
