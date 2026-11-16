
// ========================================
// 1. DATABASE GIẢ LẬP
// ========================================

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


// ========================================
// 2. GIẢ LẬP API LOGIN
// ========================================

function login(username, password) {

    return new Promise((resolve, reject) => {

        console.log("Đang gửi yêu cầu đăng nhập...");

        // Giả lập server xử lý trong 1 giây
        setTimeout(() => {

            // Kiểm tra dữ liệu đầu vào
            if (!username || !password) {
                reject({
                    status: 400,
                    message: "Vui lòng nhập đầy đủ thông tin!"
                });
                return;
            }

            // Tìm người dùng
            const user = users.find(
                u => u.username === username
            );

            // Kiểm tra tài khoản
            if (!user) {
                reject({
                    status: 401,
                    message: "Tài khoản hoặc mật khẩu không chính xác!"
                });
                return;
            }

            // Kiểm tra mật khẩu
            if (user.password !== password) {
                reject({
                    status: 401,
                    message: "Tài khoản hoặc mật khẩu không chính xác!"
                });
                return;
            }

            // Tạo token giả lập
            const token = "fake-jwt-token-" + Date.now();

            // Trả về kết quả thành công
            resolve({
                status: 200,
                message: "Đăng nhập thành công!",
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                token: token
            });

        }, 1000);
    });
}


// ========================================
// 3. HÀM XỬ LÝ ĐĂNG NHẬP
// ========================================

async function handleLogin(username, password) {

    try {

        // Gọi API đăng nhập và chờ kết quả
        const response = await login(username, password);

        console.log("Đăng nhập thành công!");
        console.log("Thông tin người dùng:", response.data);
        console.log("Access Token:", response.token);

        // Lưu token
        localStorage.setItem("accessToken", response.token);

        // Lưu thông tin người dùng
        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

        console.log("Đã lưu thông tin đăng nhập!");

        return response;

    } catch (error) {

        console.error("Đăng nhập thất bại!");
        console.error("Status:", error.status);
        console.error("Message:", error.message);

        return null;
    }
}


// ========================================
// 4. THỰC THI
// ========================================

// Giả lập người dùng nhập thông tin
handleLogin("nam", "nam123");
