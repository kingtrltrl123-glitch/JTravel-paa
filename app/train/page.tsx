"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { searchMultiModalRoute, searchStations } from "@/lib/trainApi";

export default function TrainPage() {
    const { t } = useLanguage();
    const [fromStation, setFromStation] = useState("Tokyo");
    const [toStation, setToStation] = useState("Osaka");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [stations, setStations] = useState<any[]>([]);
    const [error, setError] = useState("");

    // ရထားလမ်းကြောင်းရှာဖွေခြင်း
    const handleRouteSearch = async () => {
        if (!fromStation || !toStation) {
            setError(t('train.error_empty'));
            return;
        }

        setLoading(true);
        setError("");

        try {
            const route = await searchMultiModalRoute(fromStation, toStation);

            if (route.success && route.routeUrl) {
                window.open(route.routeUrl, '_blank');
                setResult(route);
            } else {
                setError(t('train.error_not_found'));
            }
        } catch (err) {
            setError(t('train.error_api'));
        }

        setLoading(false);
    };

    // ဘူတာရုံရှာဖွေခြင်း
    const handleStationSearch = async () => {
        if (!searchKeyword) return;

        setLoading(true);
        setError("");

        try {
            const stationsData = await searchStations(searchKeyword);
            if (stationsData.success && stationsData.stations) {
                setStations(stationsData.stations);
            } else {
                setStations([]);
            }
        } catch (err) {
            setError(t('train.error_api'));
        }

        setLoading(false);
    };

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea, #764ba2)", padding: "40px 20px" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>

                {/* Title */}
                <h1 style={{ color: "white", textAlign: "center", marginBottom: "10px", fontSize: "2rem" }}>
                    {t('train.title')}
                </h1>
                <p style={{ color: "rgba(255,255,255,0.9)", textAlign: "center", marginBottom: "40px" }}>
                    {t('train.subtitle')}
                </p>

                <div style={{ background: "white", borderRadius: "20px", padding: "30px" }}>

                    {/* ===== Section 1: Route Search ===== */}
                    <div style={{ marginBottom: "30px" }}>
                        <h3 style={{ marginBottom: "15px", color: "#333" }}>🔍 {t('train.route_search')}</h3>

                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px", color: "#333" }}>
                                {t('train.from')}
                            </label>
                            <input
                                type="text"
                                value={fromStation}
                                onChange={(e) => setFromStation(e.target.value)}
                                placeholder="e.g., Tokyo, Shinjuku, Kyoto"
                                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px" }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px", color: "#333" }}>
                                {t('train.to')}
                            </label>
                            <input
                                type="text"
                                value={toStation}
                                onChange={(e) => setToStation(e.target.value)}
                                placeholder="e.g., Osaka, Shibuya, Sapporo"
                                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px" }}
                            />
                        </div>

                        <button
                            onClick={handleRouteSearch}
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "linear-gradient(135deg, #667eea, #764ba2)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? t('train.loading') : t('train.search')}
                        </button>

                        {result && !loading && (
                            <div style={{ marginTop: "15px", padding: "12px", background: "#e8f5e9", borderRadius: "8px" }}>
                                <p style={{ color: "#2a7a2a" }}>✅ {t('train.route_found')}</p>
                                {result.summary && (
                                    <div style={{ fontSize: "14px", marginTop: "8px" }}>
                                        <p>⏱️ {t('train.duration')}: {result.summary.time}</p>
                                        <p>💰 {t('train.fare')}: {result.summary.fare}</p>
                                        <p>🔄 {t('train.transfers')}: {result.summary.transferCount}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #eee" }} />

                    {/* ===== Section 2: Station Search ===== */}
                    <div>
                        <h3 style={{ marginBottom: "15px", color: "#333" }}>🏢 {t('train.station_search')}</h3>

                        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                placeholder={t('train.station_placeholder')}
                                style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px" }}
                                onKeyPress={(e) => e.key === "Enter" && handleStationSearch()}
                            />
                            <button
                                onClick={handleStationSearch}
                                style={{ padding: "12px 24px", background: "#ff6b6b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                            >
                                {t('train.search')}
                            </button>
                        </div>

                        {error && !loading && (
                            <div style={{ padding: "12px", background: "#fee", borderRadius: "8px", color: "#c33", marginBottom: "15px" }}>
                                ❌ {error}
                            </div>
                        )}

                        {loading && (
                            <div style={{ textAlign: "center", padding: "20px" }}>
                                <div style={{ display: "inline-block", width: "30px", height: "30px", border: "3px solid #f3f3f3", borderTop: "3px solid #667eea", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
                                <p style={{ marginTop: "10px" }}>{t('train.loading')}</p>
                            </div>
                        )}

                        {stations.length > 0 && !loading && (
                            <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #eee", borderRadius: "8px" }}>
                                {stations.map((station, idx) => (
                                    <div key={idx} style={{ padding: "12px 15px", borderBottom: "1px solid #eee", cursor: "pointer" }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = "#f8f9fa"; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                                        onClick={() => {
                                            setFromStation(station.name);
                                            setSearchKeyword("");
                                            setStations([]);
                                        }}
                                    >
                                        <div style={{ fontWeight: "bold" }}>{station.name}</div>
                                        {station.line && (
                                            <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                                                🚆 {station.line}
                                            </div>
                                        )}
                                        {station.lat && station.lon && (
                                            <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>
                                                📍 {station.lat.toFixed(4)}, {station.lon.toFixed(4)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {stations.length === 0 && searchKeyword && !loading && !error && (
                            <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                                {t('train.no_stations')}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ marginTop: "20px", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
                    {t('train.powered_by')}
                </div>
            </div>

            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}