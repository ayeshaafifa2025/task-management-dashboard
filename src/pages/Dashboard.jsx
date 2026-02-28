

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FaThLarge,   
  FaSignOutAlt, FaSearch, FaBars, 
  FaChartLine
} from 'react-icons/fa';
import { MdForwardToInbox, MdOutlineTask } from 'react-icons/md';
import { IoIosHelpBuoy, IoIosNotifications, IoIosPeople } from 'react-icons/io';
import { LuCircleArrowOutUpRight } from 'react-icons/lu';
import { SlCalender } from 'react-icons/sl';
import { IoSettingsSharp } from 'react-icons/io5';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';


const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, navigate]);

    if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg text-success"></span></div>;

    const { overview, users, analytics, products } = dashboardData || {};

    const totalViews = analytics?.reduce((acc, curr) => acc + curr.views, 0);
    const totalClicks = analytics?.reduce((acc, curr) => acc + curr.clicks, 0);
    const avgConversion = analytics?.length > 0 
        ? (analytics.reduce((acc, curr) => acc + curr.conversions, 0) / analytics.length).toFixed(1) 
        : 0;

    return (
        <div className="flex min-h-screen bg-[#F8F9FA] relative">
            
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 m-3 rounded-3xl  p-6 flex flex-col transition-transform duration-300 lg:sticky lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
               
                    <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-2 text-[#006A4E] font-bold text-2xl">
                        <div className="bg-[#E6F1EE] p-2 rounded-xl"><img src="https://i.ibb.co.com/F4dTSgjD/A-small-green-icon-r.png" className='w-10 h-10' alt="" /></div> Donezo
                    </div>
                    <button className="lg:hidden text-gray-500" onClick={() => setSidebarOpen(false)}>✕</button>
                </div>
                
                <nav className="flex-1 space-y-2">
                    <div className='text-gray-500'>
                        MENU
                    </div>
                    <div className="flex items-center gap-3 text-white bg-[#006A4E] p-3 rounded-xl cursor-pointer">
                        <FaThLarge /> <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <MdOutlineTask /> <span>Tasks</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <SlCalender /> <span>Calender</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <FaChartLine /> <span>Analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <IoIosPeople /> <span>Team</span>
                    </div>
                    <br /><br /><br />
                    <div className='text-gray-500'>
                        GENERAL
                    </div>
                      <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                       <IoSettingsSharp />  <span>Settings</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <IoIosHelpBuoy /> <span>Help</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                        <FaSignOutAlt /> <span onClick={() => { localStorage.clear(); navigate('/'); }} >Logout</span>
                    </div>
                </nav>

        <br />
        <br />
        <br />

        <img src="https://i.ibb.co.com/9H9p8w4Z/A-promotional-graphi.png" className='w-50 h-50' alt="" />
                

               
            </aside>

           
            {isSidebarOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

            <main className="flex-1 p-4 md:p-8 w-full overflow-hidden">
               
<header className="flex items-center gap-4 mb-10 w-full">
    <div className="flex justify-between items-center bg-gray-100 p-6 md:p-3 rounded-2xl w-full shadow-sm">
        
       
        <div className="flex items-center gap-3 flex-1">
            <button className="lg:hidden p-2 bg-white rounded-lg shadow-sm" onClick={() => setSidebarOpen(true)}>
                <FaBars />
            </button>
            
            <div className="relative w-full max-w-md">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black" />
                <input 
                    type="text" 
                   
                    placeholder="Search task" 
                    className="input bg-white w-full pl-11 rounded-xl text-black border-none shadow-sm h-10 md:h-11 focus:ring-0 outline-none" 
                />
            </div>
        </div>

        
        <div className="flex items-center gap-3 md:gap-6 ml-4">
            <div className="flex items-center gap-1 md:gap-2 text-gray-500 text-lg md:text-xl">
                <button className="p-2  hover:bg-gray-200 rounded-full transition-colors">
                    <MdForwardToInbox />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors relative">
                    <IoIosNotifications />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
            </div>

            <div className="flex items-center gap-3  border-gray-300 pl-3 md:pl-6">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <img 
                        src="https://i.ibb.co.com/Q37SKSZz/female-manager.jpg" 
                        alt="user" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="text-right hidden sm:block">
                    <p className="font-bold text-sm leading-tight text-gray-800">Totok Michael</p>
                    <p className="text-[10px] text-gray-400">tmichael20@mail.com</p>
                </div>
                
            </div>
        </div>

    </div>
</header>

  <section className='bg-gray-100 p-6 rounded-3xl'>
                  <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='text-xs text-gray-500 mb-2' ><span className="text-2xl text-black md:text-3xl font-bold mb-8">Dashboard</span><br /> <br />  Plan,prioritize and accomplish your tasks with ease </h1>
                    </div>
                    <div className='flex gap-5'>
                        <button className='bg-green-800 border-2 p-2 rounded-3xl text-white font-semibold' >+ Add Project</button>
                        <button className='border-2 p-2 rounded-3xl border-green-800 text-green-800 font-semibold'>Import Data</button>
                    </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <div className="bg-[#00392C] text-white p-6 rounded-[32px] shadow-lg">
                        <div className='flex justify-between items-center'>
                            <p className="text-xs opacity-70">Total Users</p>
                        <p><LuCircleArrowOutUpRight /></p>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold my-2">{overview?.totalUsers}</h2>
                        <p className="text-[10px] text-green-600">Growth: {overview?.growth}%</p>
                    </div>
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100">
                        <div className='flex justify-between items-center'>
                            <p className="text-xs text-black font-bold">Active Users</p>
                        <p className='text-black'><LuCircleArrowOutUpRight /></p>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-black my-2">{overview?.activeUsers}</h2>
                        <p className="text-[10px] text-green-600">Online Now</p>
                    </div>
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100">
                        <div className='flex justify-between items-center'>
                            <p className="text-xs text-black font-bold">Total Revenue</p>
                        <p className='text-black'><LuCircleArrowOutUpRight /></p>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-black my-2">${overview?.revenue?.toLocaleString()}</h2>
                        <p className="text-[10px] text-green-600">Gross Earnings</p>
                    </div>
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100">
                        <div className='flex justify-between items-center'> 
                            <p className="text-xs text-black font-bold">Live Products</p>
                        < p className='text-black'><LuCircleArrowOutUpRight /></p>
                        </div>
                        <h2 className="text-2xl md:text-3xl text-black font-bold my-2">{products?.length}</h2>
                        <p className="text-[10px] text-green-700">Active Items</p>
                    </div>
                </div>

                
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    
                    <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 overflow-hidden">
                        <h3 className="font-bold text-xl text-black mb-6">User Management</h3>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="text-black text-[10px] uppercase border-b border-gray-50">
                                        <th className="bg-white  px-2">Name</th>
                                        <th className="bg-white px-2 text-center">Status</th>
                                        <th className="bg-white px-2 text-right">Join Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user) => (
                                        <tr key={user.id} className="border-b last:border-0  border-gray-50">
                                            <td className="py-4 px-2">
                                                <div className="font-bold text-black text-xs md:text-sm">{user.name}</div>
                                                <div className="text-[9px] md:text-[10px] text-gray-400">{user.email}</div>
                                            </td>
                                            <td className="text-center px-2">
                                                <span className={`px-2 py-1 rounded-lg text-[9px] md:text-[10px] font-bold ${user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="text-[10px] md:text-xs text-gray-500 text-right px-2">{user.joinDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                   

  <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 flex flex-col h-full shadow-sm">
    <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-black">Project Analytics</h3>
        <select className="select select-ghost select-xs focus:ring-0 outline-none text-gray-400 cursor-pointer">
            <option>Weekly</option>
        </select>
    </div>

    <div className="flex-1 w-full h-[300px] min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={analytics}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#006A4E" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#006A4E" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                
                <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9CA3AF'}}
                    tickFormatter={(str) => str.split('-').slice(2).join('/')} 
                />
                
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9CA3AF'}} 
                />

                <Tooltip 
                    contentStyle={{ 
                        borderRadius: '15px', 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        padding: '10px'
                    }}
                    labelStyle={{ 
                        color: 'black', 
                        fontWeight: 'bold', 
                        marginBottom: '4px',
                        fontSize: '12px' 
                    }}
                    itemStyle={{
                        fontSize: '11px',
                        padding: '2px 0'
                    }}
                    cursor={{ stroke: '#006A4E', strokeWidth: 1, strokeDasharray: '5 5' }}
                />

                <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#006A4E" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                />
                
                <Area 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#FFA500" 
                    strokeWidth={3}
                    fill="transparent" 
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>

    
    <div className="mt-6 flex justify-around items-center border-t pt-4">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#006A4E]"></div>
            <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Total Views</p>
                <p className="text-sm text-black font-black">{totalViews?.toLocaleString()}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFA500]"></div>
            <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Total Clicks</p>
                <p className="text-sm text-black font-black">{totalClicks?.toLocaleString()}</p>
            </div>
        </div>
    </div>
</div>
                <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100">
                    <h3 className="font-bold text-xl text-black mb-6">Product Inventory</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full min-w-[500px]">
                            <thead>
                                <tr className="text-gray-400 text-[10px] uppercase border-b border-gray-50">
                                    <th className="bg-white">Product</th>
                                    <th className="bg-white">Category</th>
                                    <th className="bg-white">Price</th>
                                    <th className="bg-white text-right">Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product) => (
                                    <tr key={product.id} className="border-b last:border-0 border-gray-50">
                                        <td className="py-4 font-bold text-xs md:text-sm text-[#006A4E]">{product.name}</td>
                                        <td><span className="badge badge-ghost text-[10px] capitalize">{product.category}</span></td>
                                        <td className="text-xs text-black md:text-sm font-medium">${product.price}</td>
                                        <td className="text-xs md:text-sm text-black font-bold text-right">{product.sales}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                </div>


               
  </section>
            </main>
        </div>
    );
};

export default Dashboard;




