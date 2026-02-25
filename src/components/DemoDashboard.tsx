import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PhoneCall, 
  Calendar as CalendarIcon, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Mail,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Play,
  CalendarDays,
  Zap,
  Bot,
  History,
  RefreshCw,
  UserPlus,
  ArrowRightCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const dummyCalls = [
  { id: 1, name: "Sarah Johnson", phone: "+1 (555) 123-4567", time: "10:30 AM", duration: "2:45", status: "Booked", type: "Appointment" },
  { id: 2, name: "Michael Chen", phone: "+1 (555) 987-6543", time: "09:15 AM", duration: "1:20", status: "Info Given", type: "Inquiry" },
  { id: 3, name: "Emma Wilson", phone: "+1 (555) 456-7890", time: "Yesterday", duration: "3:10", status: "Rescheduled", type: "Appointment" },
  { id: 4, name: "David Miller", phone: "+1 (555) 222-3333", time: "Yesterday", duration: "0:45", status: "Transferred", type: "Urgent" },
  { id: 5, name: "Lisa Brown", phone: "+1 (555) 888-9999", time: "2 days ago", duration: "2:15", status: "Booked", type: "Appointment" },
];

const chartData = [
  { name: 'Mon', calls: 45, booked: 32 },
  { name: 'Tue', calls: 52, booked: 38 },
  { name: 'Wed', calls: 48, booked: 35 },
  { name: 'Thu', calls: 61, booked: 45 },
  { name: 'Fri', calls: 55, booked: 40 },
  { name: 'Sat', calls: 32, booked: 22 },
  { name: 'Sun', calls: 28, booked: 18 },
];

const DemoDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeTab === id 
          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span className={`font-medium ${!sidebarOpen && 'hidden'}`}>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col p-4 relative z-20"
      >
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xl">R</div>
          {sidebarOpen && <span className="font-heading font-bold text-xl text-slate-900">RedSquare AI</span>}
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
          
          <div className="pt-4 pb-2">
            <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 ${!sidebarOpen && 'hidden'}`}>Appointments</p>
            <SidebarItem id="appointments-today" icon={CalendarIcon} label="Today's Schedule" />
            <SidebarItem id="appointments-all" icon={CalendarDays} label="All Booked" />
            <SidebarItem id="appointments-rescheduled" icon={RefreshCw} label="Rescheduled" />
          </div>

          <div className="pt-2 pb-2">
            <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 ${!sidebarOpen && 'hidden'}`}>Patients & CRM</p>
            <SidebarItem id="crm" icon={Users} label="Patient CRM" />
            <SidebarItem id="follow-ups" icon={ArrowRightCircle} label="Follow-ups" />
          </div>

          <div className="pt-2 pb-2">
            <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2 ${!sidebarOpen && 'hidden'}`}>System</p>
            <SidebarItem id="workflow-explain" icon={HelpCircle} label="Workflow Explain" />
            <SidebarItem id="calls" icon={PhoneCall} label="Call Logs" />
            <SidebarItem id="automations" icon={Zap} label="Automations" />
            <SidebarItem id="settings" icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="pt-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 px-2 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">Dr. Smith</p>
                <p className="text-xs text-slate-500 truncate">Admin View</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-bottom border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search calls, patients, or appointments..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-slate-900/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-slate-900 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2 bg-slate-100 text-slate-900 px-3 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-slate-900 rounded-full animate-pulse"></span>
              AI Assistant Active
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-3xl font-heading font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Here's what's happening with your AI receptionist today.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
                      Download Report
                    </button>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-black shadow-lg shadow-slate-900/20 transition-all">
                      View Live Calls
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Calls', value: '1,284', change: '+12.5%', icon: PhoneCall, color: 'blue' },
                    { label: 'Appointments Booked', value: '432', change: '+18.2%', icon: CheckCircle2, color: 'emerald' },
                    { label: 'Revenue Recovered', value: '$64,800', change: '+24.1%', icon: TrendingUp, color: 'slate' },
                    { label: 'Avg. Handling Time', value: '2m 14s', change: '-15%', icon: Clock, color: 'amber' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                          <stat.icon size={24} />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                          {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {stat.change}
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Call Volume & Conversions</h3>
                        <p className="text-sm text-slate-500">Weekly performance metrics</p>
                      </div>
                      <select className="bg-slate-50 border-none rounded-lg text-sm font-medium px-3 py-1.5 focus:ring-0">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                      </select>
                    </div>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="calls" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorCalls)" />
                          <Area type="monotone" dataKey="booked" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                      {[
                        { type: 'call', title: 'New Appointment Booked', time: '2 mins ago', user: 'Sarah Johnson', icon: CheckCircle2, color: 'emerald' },
                        { type: 'sms', title: 'Reminder SMS Sent', time: '15 mins ago', user: 'Michael Chen', icon: MessageSquare, color: 'blue' },
                        { type: 'mail', title: 'Confirmation Email Sent', time: '45 mins ago', user: 'Emma Wilson', icon: Mail, color: 'slate' },
                        { type: 'call', title: 'Call Rescheduled', time: '1 hour ago', user: 'David Miller', icon: CalendarDays, color: 'amber' },
                      ].map((activity, i) => (
                        <div key={i} className="flex gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-${activity.color}-50 text-${activity.color}-600 flex items-center justify-center flex-shrink-0`}>
                            <activity.icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{activity.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{activity.user} • {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
                      View All Activity
                    </button>
                  </div>
                </div>

                {/* Recent Calls Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">Recent AI Interactions</h3>
                    <button className="text-slate-900 text-sm font-bold hover:underline">View All Logs</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Caller</th>
                          <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                          <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                          <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Outcome</th>
                          <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {dummyCalls.map((call) => (
                          <tr key={call.id} className="hover:bg-slate-50/50 transition-all group">
                            <td className="px-8 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                  {call.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900">{call.name}</p>
                                  <p className="text-xs text-slate-500">{call.phone}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-4 text-sm text-slate-600">{call.time}</td>
                            <td className="px-8 py-4 text-sm text-slate-600">{call.duration}</td>
                            <td className="px-8 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                call.status === 'Booked' ? 'bg-emerald-50 text-emerald-600' :
                                call.status === 'Rescheduled' ? 'bg-amber-50 text-amber-600' :
                                call.status === 'Transferred' ? 'bg-slate-100 text-slate-900' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {call.status}
                              </span>
                            </td>
                            <td className="px-8 py-4 text-right">
                              <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                                <Play size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'calls' && (
              <motion.div 
                key="calls"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[600px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Detailed Call Logs</h2>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input type="text" placeholder="Filter calls..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm" />
                    </div>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium">Export CSV</button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {dummyCalls.map((call) => (
                    <div key={call.id} className="p-6 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                            {call.name[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{call.name}</h4>
                            <p className="text-xs text-slate-500">{call.phone} • {call.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{call.type}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            call.status === 'Booked' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                          }`}>{call.status}</span>
                          <button className="p-2 text-slate-400 hover:text-slate-900"><MoreVertical size={18} /></button>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-slate-600 italic">"AI: Hello! I've successfully scheduled your appointment for Tuesday at 2:00 PM. You'll receive a confirmation SMS shortly."</p>
                      </div>
                      <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={14} /> {call.duration}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MessageSquare size={14} /> 12 turns
                        </div>
                        <button className="ml-auto text-slate-900 text-xs font-bold hover:underline flex items-center gap-1">
                          Listen to Recording <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div 
                key="calendar"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[600px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Google Calendar Sync</h2>
                    <p className="text-sm text-slate-500">Connected to: clinic-main@gmail.com</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">Today</button>
                    <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                      <button className="px-4 py-2 bg-slate-50 text-slate-900 text-sm font-medium">Week</button>
                      <button className="px-4 py-2 hover:bg-slate-50 text-slate-500 text-sm font-medium">Month</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="bg-slate-50 p-4 text-center text-xs font-bold text-slate-500 uppercase">{day}</div>
                  ))}
                  {[...Array(35)].map((_, i) => {
                    const day = i - 2;
                    const isToday = day === 25;
                    const hasAppointment = [24, 26, 28].includes(day);
                    return (
                      <div key={i} className="bg-white min-h-[120px] p-2 hover:bg-slate-50 transition-all cursor-pointer relative">
                        <span className={`text-xs font-bold ${day <= 0 ? 'text-slate-300' : isToday ? 'bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-500'}`}>
                          {day <= 0 ? 30 + day : day > 31 ? day - 31 : day}
                        </span>
                        {hasAppointment && (
                          <div className="mt-2 space-y-1">
                            <div className="bg-slate-100 text-slate-900 text-[10px] p-1 rounded font-bold truncate border-l-2 border-slate-900">
                              10:00 AM - Sarah J.
                            </div>
                            {day === 26 && (
                              <div className="bg-blue-50 text-blue-600 text-[10px] p-1 rounded font-bold truncate border-l-2 border-blue-500">
                                2:30 PM - Mike C.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'appointments-today' && (
              <motion.div 
                key="appointments-today"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Today's Appointments</h2>
                    <p className="text-sm text-slate-500">Wednesday, Feb 25, 2026</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600">Print Schedule</button>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium">Add Manual Entry</button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="divide-y divide-slate-50">
                    {[
                      { time: '09:00 AM', patient: 'Sarah Johnson', type: 'General Checkup', status: 'Confirmed', provider: 'Dr. Smith' },
                      { time: '10:30 AM', patient: 'Michael Chen', type: 'Dental Cleaning', status: 'Arrived', provider: 'Dr. Smith' },
                      { time: '01:00 PM', patient: 'Emma Wilson', type: 'Follow-up', status: 'Confirmed', provider: 'Dr. Smith' },
                      { time: '02:30 PM', patient: 'David Miller', type: 'Consultation', status: 'Pending', provider: 'Dr. Smith' },
                      { time: '04:00 PM', patient: 'Lisa Brown', type: 'Emergency', status: 'Confirmed', provider: 'Dr. Smith' },
                    ].map((apt, i) => (
                      <div key={i} className="p-6 flex items-center gap-6 hover:bg-slate-50/50 transition-all">
                        <div className="w-24 text-sm font-bold text-slate-400">{apt.time}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">{apt.patient}</h4>
                          <p className="text-xs text-slate-500">{apt.type} • {apt.provider}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          apt.status === 'Arrived' ? 'bg-blue-50 text-blue-600' :
                          apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {apt.status}
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-900"><MoreVertical size={18} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'appointments-all' && (
              <motion.div 
                key="appointments-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">All Booked Appointments</h2>
                  <div className="flex gap-3">
                    <input type="date" className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm" />
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium">Filter</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { date: 'Feb 26, 2026', count: 8, appointments: ['John Doe (10:00 AM)', 'Jane Smith (11:30 AM)'] },
                    { date: 'Feb 27, 2026', count: 12, appointments: ['Robert Paul (09:00 AM)', 'Alice Wonderland (02:00 PM)'] },
                    { date: 'Feb 28, 2026', count: 5, appointments: ['Charlie Brown (10:00 AM)'] },
                  ].map((day, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900">{day.date}</h3>
                        <span className="bg-slate-100 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">{day.count} Bookings</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {day.appointments.map((apt, ai) => (
                          <div key={ai} className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                            {apt}
                          </div>
                        ))}
                        <button className="px-3 py-1.5 text-slate-900 text-xs font-bold hover:underline">+ {day.count - 2} more</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'appointments-rescheduled' && (
              <motion.div 
                key="appointments-rescheduled"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="h-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6">
                    <RefreshCw size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Rescheduled by AI</h3>
                  <p className="text-slate-500 text-center max-w-md mt-2">
                    These appointments were automatically moved by the AI assistant due to patient requests or office conflicts.
                  </p>
                  
                  <div className="mt-10 w-full max-w-2xl space-y-4 px-8">
                    {[
                      { name: 'Emma Wilson', old: 'Feb 24, 10:00 AM', new: 'Feb 25, 01:00 PM', reason: 'Patient requested' },
                      { name: 'David Miller', old: 'Feb 25, 09:00 AM', new: 'Feb 25, 02:30 PM', reason: 'Office conflict' },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">Reason: {item.reason}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-[10px] text-slate-400 line-through">{item.old}</p>
                            <p className="text-sm font-bold text-emerald-600">{item.new}</p>
                          </div>
                          <ChevronRight className="text-slate-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'crm' && (
              <motion.div 
                key="crm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Patient CRM</h2>
                  <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20">Add New Patient</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {dummyCalls.map(patient => (
                    <div key={patient.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-400">
                          {patient.name[0]}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{patient.name}</h4>
                          <p className="text-xs text-slate-500">Last seen: {patient.time}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Phone</span>
                          <span className="text-slate-900 font-medium">{patient.phone}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Status</span>
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold uppercase">Active</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Total Bookings</span>
                          <span className="text-slate-900 font-medium">12</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-50 flex gap-2">
                        <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100">View History</button>
                        <button className="flex-1 py-2 bg-slate-100 text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-200">Contact</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'workflow-explain' && (
              <motion.div 
                key="workflow-explain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12 max-w-5xl mx-auto"
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-slate-900">How RedSquare AI Works</h2>
                  <p className="text-slate-500 mt-4 text-lg">A seamless, automated experience for your office and your patients.</p>
                </div>

                <div className="grid grid-cols-1 gap-12 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[2.25rem] top-10 bottom-10 w-0.5 bg-slate-100 hidden md:block" />

                  {[
                    { 
                      step: 1, 
                      title: "Incoming Call Handling", 
                      desc: "The AI answers every call instantly, 24/7. It identifies the caller, understands their intent (booking, inquiry, emergency), and responds with natural, human-like conversation.",
                      icon: PhoneCall,
                      color: "slate"
                    },
                    { 
                      step: 2, 
                      title: "Smart Triage & Qualification", 
                      desc: "The assistant asks necessary questions to qualify the lead or patient. It checks your real-time availability via Google Calendar and offers specific time slots.",
                      icon: Bot,
                      color: "blue"
                    },
                    { 
                      step: 3, 
                      title: "Instant Booking & Sync", 
                      desc: "Once a time is chosen, the AI books the appointment directly into your CRM and Calendar. No manual entry required from your staff.",
                      icon: CalendarIcon,
                      color: "emerald"
                    },
                    { 
                      step: 4, 
                      title: "Automated Communication", 
                      desc: "The system immediately sends an SMS and Email confirmation. It also schedules reminder alerts (24h and 1h before) to ensure the patient shows up.",
                      icon: Mail,
                      color: "amber"
                    },
                    { 
                      step: 5, 
                      title: "Post-Visit Follow-up", 
                      desc: "After the appointment, the AI automatically follows up to ask for feedback, request a Google review, or schedule the next routine visit.",
                      icon: ArrowRightCircle,
                      color: "purple"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-8 relative z-10">
                      <div className={`w-18 h-18 rounded-3xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 flex-shrink-0`}>
                        <item.icon size={32} />
                      </div>
                      <div className="flex-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-xs font-bold uppercase tracking-widest text-slate-900`}>Step {item.step}</span>
                          <div className={`h-1 w-12 bg-slate-900/20 rounded-full`} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center">
                  <h3 className="text-3xl font-bold mb-6">Ready to automate your front desk?</h3>
                  <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto">
                    RedSquare AI recovers an average of $5,000+ in lost revenue per month for small practices.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all">Start Free Trial</button>
                    <button className="px-8 py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all">Speak to Sales</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'follow-ups' && (
              <motion.div 
                key="follow-ups"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">AI Follow-up Queue</h2>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium">Run Auto-Followup</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {[
                    { name: 'James Wilson', lastVisit: '2 days ago', status: 'Pending SMS', priority: 'High', task: 'Post-op checkup' },
                    { name: 'Maria Garcia', lastVisit: 'Yesterday', status: 'Awaiting Response', priority: 'Medium', task: 'Review request' },
                    { name: 'Robert Taylor', lastVisit: '3 days ago', status: 'Call Scheduled', priority: 'Low', task: 'Routine reminder' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-12 rounded-full ${
                          item.priority === 'High' ? 'bg-slate-900' :
                          item.priority === 'Medium' ? 'bg-slate-400' :
                          'bg-slate-200'
                        }`} />
                        <div>
                          <h4 className="font-bold text-slate-900">{item.name}</h4>
                          <p className="text-xs text-slate-500">{item.task} • Last visit: {item.lastVisit}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</p>
                          <p className="text-sm font-medium text-slate-900">{item.status}</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'automations' && (
              <motion.div 
                key="automations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Active Automations</h2>
                  <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20">Create Automation</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[
                    { title: "New Appointment Flow", desc: "Triggered when AI books a new appointment", steps: ["Send SMS Confirmation", "Send Email Confirmation", "Add to Google Calendar", "24h Reminder SMS"], active: true },
                    { title: "No-Show Recovery", desc: "Triggered when a patient misses an appointment", steps: ["Wait 15 mins", "Send 'Missed You' SMS", "Offer Reschedule Link", "AI Follow-up Call if no response"], active: true },
                    { title: "After-Hours Lead Capture", desc: "Handles calls between 6 PM - 8 AM", steps: ["AI Answer", "Qualify Lead", "Book Appointment", "Notify Admin"], active: true },
                    { title: "Patient Feedback Loop", desc: "Triggered 2 hours after appointment", steps: ["Send Review Request", "Capture Feedback", "Notify if < 3 stars"], active: false },
                  ].map((flow, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{flow.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">{flow.desc}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${flow.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          {flow.active ? 'Active' : 'Paused'}
                        </div>
                      </div>
                      <div className="space-y-4">
                        {flow.steps.map((step, si) => (
                          <div key={si} className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-bold border border-slate-100">
                              {si + 1}
                            </div>
                            <div className="flex-1 p-3 bg-slate-50/50 rounded-xl border border-slate-50 text-sm text-slate-700 font-medium">
                              {step}
                            </div>
                            {si < flow.steps.length - 1 && <ChevronRight className="text-slate-300" size={16} />}
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end gap-3">
                        <button className="text-slate-400 text-sm font-bold hover:text-slate-600">Edit Flow</button>
                        <button className="text-slate-900 text-sm font-bold hover:underline">View Analytics</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DemoDashboard;
