require 'rspec'
require 'rspec/core/formatters/json_formatter'
require 'rspec/autorun'


class TestRunner

	include RSpec::Core

	def report code, spec
		eval code
		

		config = RSpec.configuration

		formatter = RSpec::Core::Formatters::JsonFormatter.new(config.output_stream)

		reporter =  RSpec::Core::Reporter.new(config)
		config.instance_variable_set(:@reporter, reporter)

		loader = config.send(:formatter_loader)
		notifications = loader.send(:notifications_for, RSpec::Core::Formatters::JsonFormatter)

		reporter.register_listener(formatter, *notifications)

		example_group = eval spec
		example_group.run reporter

		reporter.report(reporter.examples.size) do |r|
			r = nil
		end

	end



end