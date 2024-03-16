const ReportLayout = ({children}: Readonly<{
children: React.ReactNode;
}>) => {
    return (
        <div>
            <h2>Report Layout</h2>
            {children}
        </div>
    )
}

export default ReportLayout