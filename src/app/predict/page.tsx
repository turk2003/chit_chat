'use client';
import { useState } from 'react';
import { Search, User, Zap, MapPin, FileText, Hash } from 'lucide-react';

export default function SearchUser() {
  const [name, setName] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [predictResult, setPredictResult] = useState<string | null>(null);
  const [predictLoading, setPredictLoading] = useState(false);
  const [predictError, setPredictError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!name.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/user-search?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      console.log("ผลลัพธ์ที่ได้:", data.user);
      setResult(data.user);
    } catch (error) {
      console.error('Error searching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handlePredict = async () => {
    setPredictLoading(true);
    setPredictError(null);
    setPredictResult(null);
    try {
      // เตรียม body เฉพาะ features ที่ model ต้องการ
      const features = [
        result['Contract Acc.'],
        result.KWH_PK,
        result.KWH_PP_OP,
        result.KWH_OP_H,
        result.KWH_TOT,
      ];
      const body = { features };
  
      const res = await fetch('http://127.0.0.1:8500/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error('เกิดข้อผิดพลาดในการประเมิน');
      }
      const data = await res.json();
      setPredictResult(data.Predict ?? JSON.stringify(data));
    } catch (err: any) {
      setPredictError(err.message || 'เกิดข้อผิดพลาด');
    } finally {
      setPredictLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">ระบบประเมินเเนวโน้มการละเมิดใช้ไฟ</h1>
          </div>
          <p className="text-gray-600">ค้นหาข้อมูลผู้ใช้ไฟฟ้าด้วยชื่อลูกค้า</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="กรอกชื่อผู้ใช้ไฟฟ้า..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className=" text-black w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !name.trim()}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[120px]"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  ค้นหา
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
              <div className="flex items-center text-white">
                <User className="w-6 h-6 mr-3" />
                <h2 className="text-2xl font-bold">ข้อมูลผู้ใช้ไฟฟ้า</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center mb-3">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">เลขที่สัญญา</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{result['Contract Acc.']}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center mb-3">
                    <User className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">ชื่อลูกค้า</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{result['Cust. Name']}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center mb-3">
                    <Hash className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">เลขที่ PEA</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{result['PEA    No .']}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center mb-3">
                    <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">หน่วยไฟฟ้า (KWH)</span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">{result.KWH_TOT?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-gray-600">ที่อยู่</span>
                </div>
                <p className="text-lg text-gray-800 leading-relaxed">{result['Address']}</p>
              </div>
            </div>
          </div>
        )}
        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
            {/* ...existing code... */}
            <div className="p-8">
              {/* ...existing code... */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handlePredict}
                  disabled={predictLoading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
                >
                  {predictLoading ? 'กำลังประเมิน...' : 'ประเมิน'}
                </button>
              </div>
              {/* แสดงผลลัพธ์การประเมิน */}
              {predictResult && (
                <div className="mt-6 text-center">
                  <span
                    className={
                      "inline-block px-6 py-3 rounded-xl font-bold text-lg shadow " +
                      (predictResult === "มีเเนวโน้มละเมิด"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700")
                    }
                  >
                    ผลการประเมิน: {predictResult}
                  </span>
                </div>
              )}
              {predictError && (
                <div className="mt-6 text-center text-red-500 font-semibold">
                  {predictError}
                </div>
              )}
            </div>
          </div>
        )}
        

        {/* Empty State */}
        {!result && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">กรอกชื่อผู้ใช้ไฟฟ้าเพื่อเริ่มค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
}