// ======================================================
// !!! THAY THÔNG TIN NÀY BẰNG CỦA BẠN !!!
// ======================================================
const SUPABASE_URL = 'https://isjbigrpjokxrnwpmuzi.supabase.co'      // ← URL của bạn
const SUPABASE_ANON_KEY = 'sb_publishable_U7Jr0GnN9VqI3uwX8CKsnA_8WNynEWa'          // ← Anon key của bạn
// ======================================================

// Khởi tạo Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('✅ Supabase client initialized');

// ============ BOOKS ============
async function getBooks() {
    const { data, error } = await supabaseClient
        .from('books')
        .select('*')
        .order('id', { ascending: true })
    
    if (error) {
        console.error('Lỗi lấy sách:', error)
        return []
    }
    console.log('Sách từ Supabase:', data)  // ← In ra console để xem
    return data || []
}

async function getBookById(id) {
    const { data, error } = await supabaseClient
        .from('books')
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) return null
    return data
}

async function addBook(book) {
    // Kiểm tra author và category tồn tại
    const { data: author } = await supabaseClient
        .from('authors')
        .select('id')
        .eq('id', book.authorId)
        .single();
    
    if (!author) {
        throw new Error(`Author with id ${book.authorId} does not exist`);
    }

    const { data: category } = await supabaseClient
        .from('categories')
        .select('id')
        .eq('id', book.categoryId)
        .single();
    
    if (!category) {
        throw new Error(`Category with id ${book.categoryId} does not exist`);
    }

    const { data, error } = await supabaseClient
        .from('books')
        .insert([{
            title: book.title,
            author_id: book.authorId,
            category_id: book.categoryId,
            isbn: book.isbn,
            quantity: book.quantity,
            available: book.quantity,
            location: book.location || '',
            publisher: book.publisher || '',
            year: book.year || null
        }])
        .select()
        .maybeSingle(); // dùng maybeSingle thay vì single để không báo lỗi 406 nếu không có dữ liệu trả về
    
    if (error) {
        console.error('Lỗi thêm sách:', error);
        throw error;
    }
    return data;
}

async function updateBook(id, updates) {
    // Tương tự kiểm tra tồn tại của author, category nếu có thay đổi
    // và dùng maybeSingle
    const { data, error } = await supabaseClient
        .from('books')
        .update({
            title: updates.title,
            author_id: updates.authorId,
            category_id: updates.categoryId,
            isbn: updates.isbn,
            quantity: updates.quantity,
            available: updates.available,
            location: updates.location,
            publisher: updates.publisher,
            year: updates.year
        })
        .eq('id', id)
        .select()
        .maybeSingle();
    
    if (error) {
        console.error('Lỗi cập nhật sách:', error);
        throw error;
    }
    return data;
}

async function deleteBook(id) {
    const { error } = await supabaseClient
        .from('books')
        .delete()
        .eq('id', id)
    
    if (error) {
        console.error('Lỗi xóa sách:', error)
        throw error
    }
    return true
}

// ============ AUTHORS ============
async function getAuthors() {
    const { data, error } = await supabaseClient
        .from('authors')
        .select('*')
        .order('id', { ascending: true })
    
    if (error) {
        console.error('Lỗi lấy tác giả:', error)
        return []
    }
    return data || []
}

async function addAuthor(author) {
    const { data, error } = await supabaseClient
        .from('authors')
        .insert([{
            name: author.name,
            biography: author.biography || '',
            birth_date: author.birthDate || null,
            country: author.country || ''
        }])
        .select()
        .single()
    
    if (error) throw error
    return data
}

async function updateAuthor(id, updates) {
    const { data, error } = await supabaseClient
        .from('authors')
        .update({
            name: updates.name,
            biography: updates.biography,
            birth_date: updates.birthDate,
            country: updates.country
        })
        .eq('id', id)
        .select()
        .single()
    
    if (error) throw error
    return data
}

async function deleteAuthor(id) {
    const { error } = await supabaseClient
        .from('authors')
        .delete()
        .eq('id', id)
    
    if (error) throw error
    return true
}

// ============ CATEGORIES ============
async function getCategories() {
    const { data, error } = await supabaseClient
        .from('categories')
        .select('*')
        .order('id', { ascending: true })
    
    if (error) {
        console.error('Lỗi lấy thể loại:', error)
        return []
    }
    console.log('Đã lấy được thể loại:', data?.length || 0)
    return data || []
}

async function addCategory(category) {
    const { data, error } = await supabaseClient
        .from('categories')
        .insert([{
            name: category.name,
            description: category.description || ''
        }])
        .select()
        .single()
    
    if (error) throw error
    return data
}

async function updateCategory(id, updates) {
    const { data, error } = await supabaseClient
        .from('categories')
        .update({
            name: updates.name,
            description: updates.description
        })
        .eq('id', id)
        .select()
        .single()
    
    if (error) throw error
    return data
}

async function deleteCategory(id) {
    const { error } = await supabaseClient
        .from('categories')
        .delete()
        .eq('id', id)
    
    if (error) throw error
    return true
}

// ============ READERS ============
async function getReaders() {
    const { data, error } = await supabaseClient
        .from('readers')
        .select('*')
        .order('id', { ascending: true })
    
    if (error) {
        console.error('Lỗi lấy độc giả:', error)
        return []
    }
    return data || []
}

async function getReaderById(id) {
    const { data, error } = await supabaseClient
        .from('readers')
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) return null
    return data
}

async function addReader(reader) {
    const { data, error } = await supabaseClient
        .from('readers')
        .insert([{
            full_name: reader.fullName,
            email: reader.email,
            phone: reader.phone || '',
            address: reader.address || '',
            status: reader.status || 'inactive',
            registration_date: new Date().toISOString()
        }])
        .select()
        .single()
    
    if (error) throw error
    return data
}

async function updateReader(id, updates) {
    const { data, error } = await supabaseClient
        .from('readers')
        .update({
            full_name: updates.fullName,
            email: updates.email,
            phone: updates.phone,
            address: updates.address,
            status: updates.status
        })
        .eq('id', id)
        .select()
        .single()
    
    if (error) throw error
    return data
}

async function deleteReader(id) {
    const { error } = await supabaseClient
        .from('readers')
        .delete()
        .eq('id', id)
    
    if (error) throw error
    return true
}

// ============ BORROWING ============
async function getBorrowing() {
    const { data, error } = await supabaseClient
        .from('borrowing')
        .select(`
            *,
            readers:reader_id (full_name, email),
            books:book_id (title, isbn)
        `)
        .order('borrow_date', { ascending: false })
    
    if (error) {
        console.error('Lỗi lấy mượn trả:', error)
        return []
    }
    return data || []
}

async function addBorrowing(record) {
    const { data: book, error: bookError } = await supabaseClient
        .from('books')
        .select('available')
        .eq('id', record.bookId)
        .single()
    
    if (bookError) throw bookError
    
    if (book.available <= 0) {
        throw new Error('Sách không còn trong kho')
    }
    
    const { data: borrow, error: borrowError } = await supabaseClient
        .from('borrowing')
        .insert([{
            reader_id: record.readerId,
            book_id: record.bookId,
            borrow_date: record.borrowDate,
            due_date: record.dueDate,
            notes: record.notes || '',
            status: 'borrowed'
        }])
        .select()
        .single()
    
    if (borrowError) throw borrowError
    
    await supabaseClient
        .from('books')
        .update({ available: book.available - 1 })
        .eq('id', record.bookId)
    
    return borrow
}

async function returnBook(borrowId, returnData) {
    const { data: borrow, error: borrowError } = await supabaseClient
        .from('borrowing')
        .select('book_id')
        .eq('id', borrowId)
        .single()
    
    if (borrowError) throw borrowError
    
    const { data, error } = await supabaseClient
        .from('borrowing')
        .update({
            return_date: returnData.returnDate,
            status: 'returned',
            return_condition: returnData.returnCondition,
            return_notes: returnData.returnNotes
        })
        .eq('id', borrowId)
        .select()
        .single()
    
    if (error) throw error
    
    const { data: book } = await supabaseClient
        .from('books')
        .select('available')
        .eq('id', borrow.book_id)
        .single()
    
    await supabaseClient
        .from('books')
        .update({ available: book.available + 1 })
        .eq('id', borrow.book_id)
    
    return data
}

async function deleteBorrowing(id) {
    const { data: borrow, error: borrowError } = await supabaseClient
        .from('borrowing')
        .select('book_id, return_date')
        .eq('id', id)
        .single()
    
    if (borrowError) throw borrowError
    
    if (!borrow.return_date) {
        const { data: book } = await supabaseClient
            .from('books')
            .select('available')
            .eq('id', borrow.book_id)
            .single()
        
        await supabaseClient
            .from('books')
            .update({ available: book.available + 1 })
            .eq('id', borrow.book_id)
    }
    
    const { error } = await supabaseClient
        .from('borrowing')
        .delete()
        .eq('id', id)
    
    if (error) throw error
    return true
}

// Export ra global
window.SupabaseDB = {
    getBooks, getBookById, addBook, updateBook, deleteBook,
    getAuthors, addAuthor, updateAuthor, deleteAuthor,
    getCategories, addCategory, updateCategory, deleteCategory,
    getReaders, getReaderById, addReader, updateReader, deleteReader,
    getBorrowing, addBorrowing, returnBook, deleteBorrowing
}

console.log('✅ Supabase client đã sẵn sàng!');
// ============ USERS ============
async function getUsers() {
    const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .order('id', { ascending: true });
    if (error) throw error;
    return data || [];
}

async function getUserByUsername(username) {
    const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('username', username)
        .maybeSingle();
    if (error) throw error;
    return data;
}

async function getUserByEmail(email) {
    const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();
    if (error) throw error;
    return data;
}

async function addUser(user) {
    const { data, error } = await supabaseClient
        .from('users')
        .insert([{
            username: user.username,
            password: user.password,
            full_name: user.fullName,
            email: user.email,
            role: user.role || 'user'
        }])
        .select()
        .maybeSingle();
    if (error) throw error;
    return data;
}

async function updateUser(id, updates) {
    const { data, error } = await supabaseClient
        .from('users')
        .update({
            username: updates.username,
            password: updates.password,
            full_name: updates.fullName,
            email: updates.email,
            role: updates.role
        })
        .eq('id', id)
        .select()
        .maybeSingle();
    if (error) throw error;
    return data;
}

async function deleteUser(id) {
    const { error } = await supabaseClient
        .from('users')
        .delete()
        .eq('id', id);
    if (error) throw error;
    return true;
}
// ============ THANH TOÁN ============
async function recordPayment(paymentData) {
    const { data, error } = await supabaseClient
        .from('payments')
        .insert([{
            borrowing_id: paymentData.borrowingId || null,
            reader_id: paymentData.readerId,
            amount: paymentData.amount,
            payment_date: new Date().toISOString(),
            payment_method: paymentData.method,
            notes: paymentData.notes || '',
            status: 'paid'
        }])
        .select()
        .single();
    if (error) throw error;
    return data;
}

// Cập nhật lại returnBook (tách riêng việc tạo payment)
async function returnBook(borrowId, returnData) {
    const { data: borrow, error: borrowError } = await supabaseClient
        .from('borrowing')
        .select('*, books(quantity)')
        .eq('id', borrowId)
        .single();
    if (borrowError) throw borrowError;

    const lateFee = calculateLateFee(borrow.due_date, returnData.returnDate);
    
    const { data: updated, error: updateError } = await supabaseClient
        .from('borrowing')
        .update({
            return_date: returnData.returnDate,
            status: 'returned',
            return_condition: returnData.returnCondition,
            return_notes: returnData.returnNotes,
            late_fee: lateFee,
            payment_status: lateFee > 0 ? 'unpaid' : 'paid'
        })
        .eq('id', borrowId)
        .select()
        .single();
    if (updateError) throw updateError;

    // Cập nhật số lượng sách
    const { data: book } = await supabaseClient
        .from('books')
        .select('available')
        .eq('id', borrow.book_id)
        .single();
    await supabaseClient
        .from('books')
        .update({ available: book.available + 1 })
        .eq('id', borrow.book_id);

    return { borrow: updated, lateFee };
}

// Hàm tính phí phạt (giữ nguyên)
function calculateLateFee(dueDate, returnDate) {
    const due = new Date(dueDate);
    const returned = new Date(returnDate);
    if (returned <= due) return 0;
    const daysLate = Math.ceil((returned - due) / (1000 * 60 * 60 * 24));
    return daysLate * 5000;
}
// ============ HELP REQUESTS ============
async function addHelpRequest(request) {
    const { data, error } = await supabaseClient
        .from('help_requests')
        .insert([{
            user_id: request.userId,
            user_name: request.userName,
            subject: request.subject,
            category: request.category,
            message: request.message,
            status: 'pending'
        }])
        .select()
        .maybeSingle();
    if (error) throw error;
    return data;
}

async function getHelpRequestsByUser(userId) {
    const { data, error } = await supabaseClient
        .from('help_requests')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

async function getAllHelpRequests() {
    const { data, error } = await supabaseClient
        .from('help_requests')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
}

async function updateHelpRequestStatus(id, status, adminReply = null) {
    const updateData = { status };
    if (adminReply !== null) updateData.admin_reply = adminReply;
    const { data, error } = await supabaseClient
        .from('help_requests')
        .update(updateData)
        .eq('id', id)
        .select()
        .maybeSingle();
    if (error) throw error;
    return data;
}



// ============ QUẢN LÝ THANH TOÁN (FEE & REVENUE) ============
async function getAllFees() {
    // Lấy tất cả các khoản phí chưa thanh toán (dựa trên bảng payments)
    const { data, error } = await supabaseClient
        .from('payments')
        .select(`
            *,
            readers:reader_id (full_name),
            borrowing:borrowing_id (book_id, books:book_id (title))
        `)
        .order('created_at', { ascending: false });
    if (error) {
        console.error('Lỗi lấy danh sách phí:', error);
        return [];
    }
    return data || [];
}

async function getRevenueStats() {
    // Lấy tổng doanh thu và doanh thu theo tháng
    const { data, error } = await supabaseClient
        .from('payments')
        .select('amount, payment_date')
        .eq('status', 'paid');
    if (error) return { total: 0, monthly: {} };
    let total = 0;
    const monthly = {};
    for (const p of data) {
        total += p.amount;
        const date = new Date(p.payment_date);
        const monthKey = `${date.getFullYear()}-${date.getMonth()+1}`;
        monthly[monthKey] = (monthly[monthKey] || 0) + p.amount;
    }
    return { total, monthly };
}

async function payFee(feeId) {
    // Cập nhật trạng thái thanh toán thành paid (nếu có bảng fees riêng) hoặc xóa khỏi danh sách chờ.
    // Thực tế trong hệ thống này, payments đã lưu sẵn, nên chỉ cần update status = 'paid' nếu cần.
    const { error } = await supabaseClient
        .from('payments')
        .update({ status: 'paid' })
        .eq('id', feeId);
    if (error) throw error;
    return true;
}
// Thêm vào window.SupabaseDB
window.SupabaseDB = {
    getBooks, getBookById, addBook, updateBook, deleteBook,
    getAuthors, addAuthor, updateAuthor, deleteAuthor,
    getCategories, addCategory, updateCategory, deleteCategory,
    getReaders, getReaderById, addReader, updateReader, deleteReader,
    getBorrowing, addBorrowing, returnBook, deleteBorrowing,
    getUsers, getUserByUsername, getUserByEmail, addUser, updateUser, deleteUser,
    addHelpRequest,
    getHelpRequestsByUser,
    getAllHelpRequests,
    updateHelpRequestStatus,
    recordPayment,
    returnBook,      // ghi đè hàm cũ
    calculateLateFee, 
    getAllFees,
    getRevenueStats,
    payFee
};






// Thêm dòng này để AuthManager có thể dùng trực tiếp supabaseClient
window.supabaseClient = supabaseClient;
