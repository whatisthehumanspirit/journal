# Custom logger and log for debugging
class DebugLogger < Logger
    def format_message(severity, timestamp, progname, msg)
        "[#{timestamp.strftime("%Y-%m-%d %H:%M:%S")}] #{severity} #{msg}\n"
    end
end

if Dir["#{RAILS_ROOT}/log"].empty?
    Dir.mkdir("#{RAILS_ROOT}/log")
end

$debugLogger = DebugLogger.new("#{RAILS_ROOT}/log/debug.log")
$debugLogger.level = DebugLogger::DEBUG